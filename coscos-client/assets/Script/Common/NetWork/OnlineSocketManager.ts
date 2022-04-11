import {CMD, CMD_ERROR_FILTER, STRING_TIPS_CODE} from "./CmdDef";
import {IDataProcess, IProtocolHelper, NetworkNode} from "./NetworkNode";
import {EventEmitter} from "./pomelo/EventEmitter";
import {EventSystem} from "../../Logic/Event/EventSystem";
import {EVENT} from "../../Logic/Event/EventDefine";


const codeFilter: Array<number> = [50150];
//心跳电文
const escapeNetworkCmd = [CMD.HEARTBEATTIMEOUT];

export class OnlineSocketManager extends EventEmitter implements IProtocolHelper {
    private static _instance: OnlineSocketManager;

    private _networkNode: NetworkNode;
    private _control: boolean = false;
    private _operateMsgQueue: Array<any> = [];
    private _requestTimeOutID: number = 0;

    private _dataCtrls: Array<IDataProcess> = [];

    set IP(v: string) {
        this._networkNode.IPAddress = v;
    }

    get IP(): string {
        return this._networkNode.IPAddress;
    }

    set Port(v: number | null) {
        this._networkNode.port = v;
    }

    get Port(): number | null {
        return this._networkNode.port;
    }

    constructor() {
        super();
        this._networkNode = new NetworkNode(this);
        this._operateMsgQueue = [];
        this._control = false;
        this._dataCtrls = [];
    }

    public openSocket() {
        this._networkNode.openSocket();
    }

    public closeSocket() {
        this._networkNode.closeSocket();
    }

    //#region 主要进行数据协议处理，进行相关model数据缓存处理

    public addDataProcess(dataProcess: IDataProcess) {
        if (this._dataCtrls.indexOf(dataProcess) === -1) {
            this._dataCtrls.push(dataProcess);
        }
    }

    public removeDataProcess(dataProcess: IDataProcess) {
        let idx: number = this._dataCtrls.indexOf(dataProcess)
        if (idx !== -1) {
            this._dataCtrls.splice(idx, 1);
        }
    }

    public clearDataProcess() {
        this._dataCtrls = [];
    }

    //#endregion 主要进行数据协议处理，进行相关model数据缓存处理

    public getControl() {
        this._control = false;
    }

    public removeControl(): void {
        this._control = true;
    }

    cmdTimeOut(): void {
        cc.error("OnlineSocketManager cmdTimeout")
        this._networkNode.reOpen();
    }

    // 消息处理
    public processMessage(route: string, msg: any): void {
        //心跳电文
        if (escapeNetworkCmd.indexOf(route) === -1) {
            // 心跳回来，取消定时器
            if (this._requestTimeOutID > 0) {
                clearTimeout(this._requestTimeOutID);
                this._requestTimeOutID = 0;
            }
        }
        //正常协议model处理
        if (!msg.code || msg.code === 200) {
            // model 数据处理
            for (let i in this._dataCtrls) {
                if (this._dataCtrls[i]) {
                    this._dataCtrls[i].process(route, msg);
                }
            }
        } else {
            // 错误处理，如错误码，协议特殊处理等
            if (codeFilter.indexOf(msg.code) < 0) {
                if (msg.code > 50000 || STRING_TIPS_CODE.indexOf(msg.code) != -1) {
                    let [arg1, arg2, arg3, arg4, _] = msg.params || [];
                    // TipsManager.getInstance().showTips(ConfigManager.getGameString(msg.code, arg1, arg2, arg3, arg4));
                } else {
                    // TipsManager.getInstance().showMsgBox({
                    //     errCode: msg.code,
                    //     content: ConfigManager.getGameString(msg.code),
                    //     isSingleBtn: true,
                    // });
                }
                EventSystem.instance.fire(EVENT.ON_ERROR_CODE, msg);
            }
            if ((!CMD_ERROR_FILTER.has(route)) && (codeFilter.indexOf(msg.code) < 0)) {
                return;
            }
        }
        //处理消息插入队列
        this.handleMsgInsertQueue(route, msg);
        //消息处理，按插入顺序逐个处理
        this.handleMsg();
    }

    handleMsgInsertQueue(route: string, msg: any) {
        this._operateMsgQueue.push({
            route,
            msg
        });
    }

    //依次处理消息队列
    handleMsg() {
        if (this._control) {
            //游戏操作消息队列
            if (this._operateMsgQueue.length > 0) {
                let obj = this._operateMsgQueue.shift();
                // 发送协议事件,通知视图层
                // cc.log("OnlineSocketManager emit", obj.route, JSON.stringify(obj.msg));
                this.emit(obj.route, obj.msg)
            }
        }
    }

    // 发送消息
    public sendMsg(route: string, msg: any): void {
        if (this._networkNode.isSocketOpen()) {
            if (this._requestTimeOutID > 0) {
                clearTimeout(this._requestTimeOutID);
                this._requestTimeOutID = 0;
            }
            this._requestTimeOutID = setTimeout(() => {
                this.cmdTimeOut();
            }, 30 * 1000)
        }
        this._networkNode.sendMsg(route, msg);
    }

    // 发送通知消息
    public sendNotify(route: string, msg: any): void {
        this._networkNode.sendNotify(route, msg);
    }

    public static getInstance(): OnlineSocketManager {
        if (!this._instance) {
            this._instance = new OnlineSocketManager();
        }
        return this._instance;
    }
}

export let OnlineSocketMgr = OnlineSocketManager.getInstance();