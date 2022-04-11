import {CMD} from "./CmdDef";
import {Pomelo} from "./pomelo/Pomelo";

export enum SocketState {
    CONNECTING = 0,
    OPEN,
    CLOSING,
    CLOSED,
}

export enum ServerType {
    GateServer = 1,
    ConnectorServer,
}

// 协议通信管理辅助接口
export interface IProtocolHelper {
    processMessage(route: string, msg: any): void;
}

// 所有缓存数据都要实现这个接口
export interface IDataProcess {
    process(route: string, msg: any): void
}

export class NetworkNode {
    private _currentSocketStatus: SocketState = SocketState.CLOSED;
    private _socketType: ServerType = ServerType.GateServer
    private _currentReconnectCount: number = 0;
    private _reconnectionDelay: number = 0;
    private _reconnectionTimerId: number | undefined = undefined;
    private _messageDelay: number = 0;
    private _maxReconnectCount: number = 0;
    private _needReconnect: boolean = false;
    private _forbidReconnect: boolean = false;       //禁止重连
    public IPAddress: string = "";
    public port: number | null = null;
    private _heartbeatTimeout: boolean = false;
    private _tryReconnecting: boolean = false;
    private _pomelo: Pomelo;
    private _protoHandler: IProtocolHelper | null = null;

    constructor(protoHandler: IProtocolHelper) {
        this._protoHandler = protoHandler;
        this._pomelo = new Pomelo();
        this._socketType = ServerType.GateServer;
        this.startListener();
        this._currentSocketStatus = SocketState.CLOSED;
        this._currentReconnectCount = 0;
        this._reconnectionDelay = 500;
        this._messageDelay = 1000;
        this._maxReconnectCount = 10;
        this._needReconnect = true;
        this._forbidReconnect = false;
        this.IPAddress = "";
        this.port = 0;
    }

    onRecv(route: string, msg: object) {
        let mydate = new Date();
        if (route != "connector.entryHandler.setLog") {
            cc.log("NetworkNode onRecv", mydate.toLocaleTimeString(), route, JSON.stringify(msg));
        }
        if (this._protoHandler) {
            this._protoHandler.processMessage(route, msg);
        }
    }

    public sendMsg(route: string, msg: object) {
        let mydate = new Date();
        if (!this.isSocketOpen()) {
            if (!this._tryReconnecting) {
                this.openSocket();
            }
        }
        this._pomelo.request(route, msg);
        if (route !== "connector.entryHandler.setLog") {
            cc.log("NetworkNode sendMsg", mydate.toLocaleTimeString(), route, JSON.stringify(msg));
        }
    }

    public sendNotify(route: string, msg: object) {
        let mydate = new Date();
        if (!this.isSocketOpen()) {
            if (!this._tryReconnecting) {
                this.openSocket();
            }
        }
        this._pomelo.notify(route, msg);
        if (route !== "connector.entryHandler.setLog") {
            cc.log("NetworkNode sendMsg", mydate.toLocaleTimeString(), route, JSON.stringify(msg));
        }
    }


    public openSocket() {
        if (!this.isSocketOpen()) {
            this.createSocket();
        }
    }

    public isSocketOpen() {
        return this._currentSocketStatus === SocketState.OPEN;
    }

    public getSocketStatus(): SocketState {
        return this._currentSocketStatus;
    }

    public getSocketType(): ServerType {
        return this._socketType;
    }

    public setSocketType(socketType: ServerType) {
        this._socketType = socketType;
    }

    createSocket() {
        if (this.getSocketStatus() !== SocketState.CLOSED) {
            return;
        }
        if (this._reconnectionTimerId) {
            clearTimeout(this._reconnectionTimerId)
            this._reconnectionTimerId = undefined
        }
        this._currentSocketStatus = SocketState.CONNECTING;
        var self = this;
        this._pomelo.init({
            host: this.IPAddress,
            port: this.port,
            user: {},
            encrypt: "",
            handshakeCallback: function (info: any) {
                cc.log("handshake start Init")
                //protocolSafe.setSecret(protocolSafe.getSec(info.sys.pubkey));
            }.bind(this),
        }, function (socket: WebSocket) {
            self._reconnectionDelay = 3000;
            self._currentReconnectCount = 0;
            self._tryReconnecting = false;
            self._needReconnect = true;
            self._currentSocketStatus = SocketState.OPEN;
            self._heartbeatTimeout = false;
            cc.log("websocket connect success")
            self.onRecv(CMD.SOCKET_CONNECT_SUCCEED, {
                "info": {
                    "socketState": self.isSocketOpen()
                }
            });
        }.bind(this));
    }

    public startListener() {
        this._pomelo.on("recvData", this.onRecv.bind(this));
        this._pomelo.on("close", this.onClose.bind(this));
        this._pomelo.on("disconnect", this.onDisconnect.bind(this));
        this._pomelo.on("reconnect", this.onReconnect.bind(this));
        this._pomelo.on("io-error", this.onError.bind(this));
        this._pomelo.on("heartbeat timeout", this.onHeartbeatTimeout.bind(this));
        this._pomelo.on("error", this.onHandshakeError.bind(this));
    }

    onClose() {
        this._currentSocketStatus = SocketState.CLOSED;
        setTimeout(this.reconnectSilence.bind(this), this._messageDelay);
        console.error("NetworkNode onClose");
    }

    onDisconnect() {
        this._currentSocketStatus = SocketState.CLOSED;
        console.error("NetworkNode onDisconnect");
        this.onRecv(CMD.SOCKET_DISCONNECT, {
            "info": {
                "socketState": this.isSocketOpen()
            }
        });
    }

    onReconnect() {
        this._currentSocketStatus = SocketState.OPEN;
        cc.log("NetworkNode onReconnect");
        this._currentReconnectCount = 0;
        this._needReconnect = true;
        this.onRecv(CMD.SOCKET_CONNECT_SUCCEED, {
            "info": {
                "socketState": this.isSocketOpen()
            }
        });
    }

    onError(event: String) {
        console.error("onError", event);
    }

    onHeartbeatTimeout() {
        //心跳超时,只处理一次
        if (this._heartbeatTimeout == false) {
            this._heartbeatTimeout = true;
            console.error("NetworkNode onHeartbeatTimeout");
            this.reOpen();
            this.onRecv(CMD.HEARTBEATTIMEOUT, {
                "info": {
                    "socketState": this.isSocketOpen()
                }
            });
        }
    }

    onHandshakeError() {
        console.error("NetworkNode onHandshakeError");
    }

    public closeSocket() {
        this._needReconnect = false;
        if ((this._currentSocketStatus !== SocketState.CLOSING) &&
            (this._currentSocketStatus !== SocketState.CLOSED)) {
            this._currentSocketStatus = SocketState.CLOSING;
            this._pomelo.disconnect();
        }
    }

    public setNeedReconnect(needReconnect: boolean) {
        this._needReconnect = needReconnect;
    }

    public setForbidReconnect(forbid: boolean) {
        this._forbidReconnect = forbid;
    }

    public reOpen() {
        this._needReconnect = true;
        if ((this._currentSocketStatus !== SocketState.CLOSING) && (this._currentSocketStatus !== SocketState.CLOSED)) {
            this._currentSocketStatus = SocketState.CLOSING;
            this._pomelo.disconnect();
        }
    }

    reconnectSilence() {
        if (this._forbidReconnect) {
            return;
        }
        if (!this._needReconnect) {
            return;
        }
        if (!this.isSocketOpen()) {
            if (this._currentReconnectCount < this._maxReconnectCount) {
                this._tryReconnecting = true;
                this._currentReconnectCount++;
                cc.log("this.reconnectionDelay", this._reconnectionDelay);
                if (this._reconnectionTimerId) {
                    clearTimeout(this._reconnectionTimerId)
                    this._reconnectionTimerId = undefined
                }
                this._reconnectionTimerId = setTimeout(this.createSocket.bind(this), this._reconnectionDelay);
                // this.reconnectionDelay *= 2;
                this._reconnectionDelay = this._reconnectionDelay > 15000 ? 15000 : this._reconnectionDelay;
                this.onRecv(CMD.SOCKET_TRY_RECONNECT, {
                    "info": {
                        "reconnectCount": this._currentReconnectCount
                    }
                });
            } else {
                this._tryReconnecting = false;
                this._needReconnect = false;
                this.onRecv(CMD.SOCKET_CONNECT_FAILED, {
                    "info": {
                        "socketState": this.isSocketOpen()
                    }
                });
            }
        }
    }
}