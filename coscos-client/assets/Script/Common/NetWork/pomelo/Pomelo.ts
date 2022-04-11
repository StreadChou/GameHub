import {Protocol} from "./Protocol";
import {Protobuf} from "./Protobuf";
import {EventEmitter} from "./EventEmitter";

const {sys} = cc;
type MSG_CALLBACK = (data: any) => void;

let localStorage = sys.localStorage;

let decodeIO_protobuf: any = null;
let decodeIO_encoder: any = null;
let decodeIO_decoder: any = null;

let Package = Protocol.Package;
let Message = Protocol.Message;

const JS_WS_CLIENT_TYPE = 'js-websocket';
const JS_WS_CLIENT_VERSION = '0.0.1';

export const RES_OK = 200;
export const RES_FAIL = 500;
export const RES_OLD_CLIENT = 501;

const DEFAULT_MAX_RECONNECT_ATTEMPTS = 10;

export class Pomelo extends EventEmitter {
    static delayTime: number = 33;  //延迟

    private socket: WebSocket | null = null;
    private reqId = 0;
    private callbacks = {};
    private handlers: { [key: number]: MSG_CALLBACK } = {};
    //Map from request id to route
    private routeMap: { [key: number]: string } = {};
    private dict: { [key: string]: any } = {}; // route string to code
    private abbrs: { [x: string]: string; } = {}; // code to route string
    private serverProtos: { [key: string]: any } = {};
    private clientProtos: { [key: string]: any } = {};
    private protoVersion = 0;

    private heartbeatInterval = 0;
    private heartbeatTimeout = 0;
    private nextHeartbeatTimeout = 0;
    private gapThreshold = 100; // heartbeat gap threashold
    private heartbeatId: number | undefined = undefined;
    private heartbeatTimeoutId: number | undefined = undefined;
    private handshakeCallback: Function | any = null;

    private decode: any = null;
    private encode: any = null;

    private reconnect = false;
    private reconncetTimer: number | undefined = undefined;
    private reconnectUrl: string = "";
    private reconnectAttempts = 0;
    private reconnectionDelay = 5000;

    private serverBaseTime = 0; // 服务端基准时间
    private clientBaseTime = 0; // 客户端基准时间

    private lastHeartTime: number = 0;

    constructor() {
        super();
        var self = this;
        this.handlers[Package.TYPE_HANDSHAKE] = (data: any) => {
            self.handshake(data);
        }
        this.handlers[Package.TYPE_HEARTBEAT] = (data: any) => {
            self.heartbeat(data);
        }
        this.handlers[Package.TYPE_DATA] = (data: any) => {
            self.onData(data);
        }
        this.handlers[Package.TYPE_KICK] = (data: any) => {
            self.onKick(data);
        }
    }

    private useCrypto: boolean = false;

    private handshakeBuffer = {
        'sys': {
            type: JS_WS_CLIENT_TYPE,
            version: JS_WS_CLIENT_VERSION,
            protocolSafe: {},
            protoVersion: 0,
            key: "",
        },
        'user': {}
    };
    private initCallback: Function | null = null;

    defaultDecode(data: any) {
        var msg = Message.decode(data);

        if (msg.id > 0) {
            msg.route = this.routeMap[msg.id];
            delete this.routeMap[msg.id];
        }

        msg.body = this.deCompose(msg);
        return msg;
    }

    defaultEncode(reqId: number, route: string, msg: any) {
        var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;

        //compress message by protobuf
        if (Protobuf && this.clientProtos[route]) {
            msg = Protobuf.encode(route, msg);
        } else if (decodeIO_encoder && decodeIO_encoder.lookup(route)) {
            var Builder = decodeIO_encoder.build(route);
            msg = new Builder(msg).encodeNB();
        } else {
            msg = JSON.stringify(msg);
            msg = Protocol.strencode(msg);
        }

        var compressRoute = false;
        if (this.dict && this.dict[route]) {
            route = this.dict[route];
            compressRoute = true;
        }

        return Message.encode(reqId, type, compressRoute, route, msg);
    }

    public init(params: any, cb: any) {
        this.initCallback = cb;
        var host = params.host;
        var port = params.port;

        this.encode = params.encode || this.defaultEncode;
        this.decode = params.decode || this.defaultDecode;

        var url = 'ws://' + host;
        if (port) {
            if (port != 0) {
                url = 'ws://' + host + ':' + port;
            }
        }
        //域名说明是https的，用wss
        if (url.includes('.com')) {
            url = url.replace('ws', 'wss');
        }

        this.handshakeBuffer.user = params.user;
        this.handshakeCallback = params.handshakeCallback;
        this.connect(params, url, cb);
    }

    connect(params: any, url: string, cb: any) {
        cc.log('connect to ' + url);

        params = params || {};
        var maxReconnectAttempts = params.maxReconnectAttempts || DEFAULT_MAX_RECONNECT_ATTEMPTS;
        this.reconnectUrl = url;
        //Add protobuf version
        if (localStorage && localStorage.getItem('protos') && this.protoVersion === 0) {
            var protos = JSON.parse(localStorage.getItem('protos') || "{}");

            this.protoVersion = protos.version || 0;
            this.serverProtos = protos.server || {};
            this.clientProtos = protos.client || {};

            if (!!Protobuf) {
                Protobuf.init({
                    encoderProtos: this.clientProtos,
                    decoderProtos: this.serverProtos
                });
            }
            if (!!decodeIO_protobuf) {
                decodeIO_encoder = decodeIO_protobuf.loadJson(this.clientProtos);
                decodeIO_decoder = decodeIO_protobuf.loadJson(this.serverProtos);
            }
        }
        //Set protoversion
        this.handshakeBuffer.sys.protoVersion = this.protoVersion;

        var self = this;
        var onopen = function (event: any) {
            if (!!self.reconnect) {
                self.emit('reconnect');
            }
            self.reset();
            var obj = Package.encode(Package.TYPE_HANDSHAKE, Protocol.strencode(JSON.stringify(self.handshakeBuffer)));
            self.send(obj);
        };
        var onmessage = function (event: any) {
            self.processPackage(Package.decode(event.data))//TODO, cb);
            // new package arrived, update the heartbeat timeout
            if (self.heartbeatTimeout) {
                self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
            }
        };
        var onerror = function (event: any) {
            self.emit('io-error', event);
            console.error('socket error: ', event);
        };
        var onclose = function (event: any) {
            self.emit('close', event);
            self.emit('disconnect', event);
            console.error('socket close: ', event);
            if (!!params.reconnect && self.reconnectAttempts < maxReconnectAttempts) {
                self.reconnect = true;
                self.reconnectAttempts++;
                self.reconncetTimer = setTimeout(() => {
                    self.connect(params, self.reconnectUrl, cb);
                }, self.reconnectionDelay);
                self.reconnectionDelay *= 2;
            }
        };
        if (this.socket) {
            if (this.socket.close) this.socket.close();
            this.socket = null;
        }
        this.socket = new WebSocket(url);
        this.socket.binaryType = 'arraybuffer';
        this.socket.onopen = onopen;
        this.socket.onerror = onerror;
        this.socket.onmessage = onmessage;
        this.socket.onclose = onclose;
    }

    disconnect() {
        if (this.socket) {
            //TODO:if (this.socket && this.socket.disconnect) this.socket.disconnect();
            if (this.socket.close) this.socket.close();
            cc.log('disconnect');
            this.socket = null;
        }

        if (this.heartbeatId) {
            clearTimeout(this.heartbeatId);
            this.heartbeatId = undefined;
        }
        if (this.heartbeatTimeoutId) {
            clearTimeout(this.heartbeatTimeoutId);
            this.heartbeatTimeoutId = undefined;
        }
    }

    reset() {
        this.reconnect = false;
        this.reconnectionDelay = 1000 * 5;
        this.reconnectAttempts = 0;
        clearTimeout(this.reconncetTimer);
    }

    public request(route: string, msg: any) {
        if (!route) {
            return;
        }
        this.reqId++;
        msg = msg || {};
        this.sendMessage(this.reqId, route, msg);
        this.routeMap[this.reqId] = route;
    }

    notify(route: string, msg: any) {
        msg = msg || {};
        this.sendMessage(0, route, msg);
    }

    getSocketStatus() {
        if (this.socket) {
            return this.socket.readyState;
        }
    }

    sendMessage(reqId: number, route: string, msg: any) {
        // if (this.useCrypto && route != "gate.gateHandler.routerEntry" && (!Protobuf || !this.clientProtos[route])) {
        //   console.log("crypto==========");
        //   msg = JSON.stringify(msg);
        //   var sig = protocolSafe.signString(msg);
        //   msg = sig;
        // }

        if (this.encode) {
            msg = this.encode(reqId, route, msg);
        }

        var packet = Package.encode(Package.TYPE_DATA, msg);
        this.send(packet);
    }

    send(packet: any) {
        if (!sys.isObjectValid(this.socket)) {
            return;
        }
        if (this.socket && this.socket.readyState == WebSocket.OPEN) {
            this.socket.send(packet.buffer);
        }
    }

    // 获取当前时间，单位秒
    now() {
        if (this.serverBaseTime == 0) {
            return Date.now();
        }
        return this.serverBaseTime + (Date.now() - this.clientBaseTime);
    }

    // 解析心跳包里的时间戳
    parseTime(data: any) {
        var bytes = new Uint8Array(data);
        if (bytes.length != 6) {
            return;
        }
        let time = 0;
        for (let i = 5; i >= 0; i--) {
            time += bytes[i];
            if (i != 0) {
                // js使用左移后，如果超过32位会溢出，这里使用乘法代替左移，使用乘法不会有问题
                time *= 256;
            }
        }
        this.serverBaseTime = time
        this.clientBaseTime = Date.now();
    }

    heartbeat(data: any) {
        cc.log("heartbeat ");
        if (!this.heartbeatInterval) {
            // no heartbeat
            return;
        }

        var obj = Package.encode(Package.TYPE_HEARTBEAT, null);
        if (this.heartbeatTimeoutId) {
            clearTimeout(this.heartbeatTimeoutId);
            this.heartbeatTimeoutId = undefined;
        }

        if (this.heartbeatId) {
            // already in a heartbeat interval
            return;
        }

        this.parseTime(data);

        if (this.lastHeartTime != 0) {
            Pomelo.delayTime = Math.floor(Date.now() - this.lastHeartTime);
        }

        var self = this;
        this.heartbeatId = setTimeout(() => {
            self.heartbeatId = undefined;
            self.send(obj);

            self.lastHeartTime = Date.now();
            self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
            self.heartbeatTimeoutId = setTimeout(() => {
                self.heartbeatTimeoutCb();
            }, self.heartbeatTimeout);
        }, this.heartbeatInterval);
    }

    heartbeatTimeoutCb() {
        var gap = this.nextHeartbeatTimeout - Date.now();
        if (gap > this.gapThreshold) {
            this.heartbeatTimeoutId = setTimeout(() => {
                this.heartbeatTimeoutCb();
            }, gap);
        } else {
            console.error('server heartbeat timeout');
            this.emit('heartbeat timeout');
        }
    }

    // 处理服务器握手协议
    handshake(data: any) {
        data = JSON.parse(Protocol.strdecode(data));
        if (data.code === RES_OLD_CLIENT) {
            this.emit('error', 'client version not fullfill');
            return;
        }

        if (data.code !== RES_OK) {
            this.emit('error', 'handshake fail');
            return;
        }

        this.handshakeInit(data);
        // 给服务器发送握手确认协议
        var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK, null);
        this.send(obj);
        // 成功接受到服务器握手协议
        if (this.initCallback) {
            this.initCallback(this.socket);
        }
    }

    onData(data: any) {
        var msg = data;
        if (this.decode) {
            msg = this.decode(msg);
        }
        this.processMessage(msg);
    }

    onKick(data: any) {
        data = JSON.parse(Protocol.strdecode(data));
        this.emit('onKick', data);
    }

    processPackage(msgs: any) {
        if (Array.isArray(msgs)) {
            for (var i = 0; i < msgs.length; i++) {
                var msg = msgs[i];
                //cc.log("Pomelo processPackage:",msg.type,msg.body)
                this.handlers[msg.type](msg.body);
            }
        } else {
            //cc.log("Pomelo processPackage:",msgs.type,msgs.body)
            this.handlers[msgs.type](msgs.body);
        }
    }

    processMessage(msg: any) {
        this.emit("recvData", msg.route, msg.body);
        return;
    }

    deCompose(msg: any) {
        var route = msg.route;

        //Decompose route from dict
        if (msg.compressRoute) {
            if (!this.abbrs[route]) {
                return {};
            }

            route = msg.route = this.abbrs[route];
        }
        if (Protobuf && this.serverProtos[route]) {
            return Protobuf.decode(route, msg.body);
        } else if (decodeIO_decoder && decodeIO_decoder.lookup(route)) {
            return decodeIO_decoder.build(route).decode(msg.body);
        } else {
            var body = Protocol.strdecode(msg.body);
            return JSON.parse(body);
        }
        return msg;
    }

    handshakeInit(data: any) {
        if (data.sys && data.sys.heartbeat) {
            this.heartbeatInterval = data.sys.heartbeat * 1000; // heartbeat interval
            this.heartbeatTimeout = this.heartbeatInterval * 2; // max heartbeat timeout
        } else {
            this.heartbeatInterval = 0;
            this.heartbeatTimeout = 0;
        }
        this.initData(data);

        if (typeof this.handshakeCallback === 'function') {
            this.handshakeCallback(data);
        }
    }

    initData(data: any) {
        if (!data || !data.sys) {
            return;
        }
        this.dict = data.sys.dict;
        var protos = data.sys.protos;

        //Init compress dict
        if (this.dict) {
            var dict = this.dict;
            this.abbrs = {};

            for (var route in dict) {
                this.abbrs[dict[route]] = route;
            }
        }

        //Init protobuf protos
        if (protos) {
            this.protoVersion = protos.version || 0;
            this.serverProtos = protos.server || {};
            this.clientProtos = protos.client || {};

            //Save protobuf protos to localStorage
            localStorage.setItem('protos', JSON.stringify(protos));

            if (!!Protobuf) {
                Protobuf.init({
                    encoderProtos: protos.client,
                    decoderProtos: protos.server
                });
            }
            if (!!decodeIO_protobuf) {
                decodeIO_encoder = decodeIO_protobuf.loadJson(this.clientProtos);
                decodeIO_decoder = decodeIO_protobuf.loadJson(this.serverProtos);
            }
        }
    }
}