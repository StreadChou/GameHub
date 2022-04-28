import {OnlineSocketManager, OnlineSocketMgr} from "../Lib/NetWork/OnlineSocketManager";


interface CMDData {
    msg: any,
    time: number,
}

interface CMDRegisterData {
    func: (msg: any, ...other: any) => void,
    socketMgr: OnlineSocketManager,
}

export class ProtocolBase {
    private _protocolDic!: Map<string, CMDRegisterData>;
    private _protocolFuncDic!: Map<string, (msg: any) => void>;
    private _isAdd = false;
    public data: any;
    private _protocolDataDic: Map<string, CMDData> = new Map<string, CMDData>();

    constructor() {
        this._protocolDic = new Map<string, CMDRegisterData>();
        this._protocolFuncDic = new Map<string, (msg: any) => void>();
        this.initProtocols();
    }

    protected initProtocols() {
        //子类重写
    }

    protected initProtocol(cmd: string, func: (msg: any, ...other: any) => void) {
        this._protocolDic.set(cmd, {
            func: func,
            socketMgr: OnlineSocketMgr,
        });
    }

    public addProtocols() {
        if (this._isAdd) {
            return;
        }
        this._isAdd = true;
        this._protocolDic.forEach((v, k) => {
            this._protocolFuncDic.set(k, (msg: any) => {
                if (v.func.length > 1) {
                    //参数大于1的表明需要存储
                    this._protocolDataDic.set(k, {
                        msg: msg,
                        time: cc.director.getTotalTime() / 1000,
                    });
                }
                v.func(msg);
            });
            v.socketMgr.on(k, this._protocolFuncDic.get(k)!);
        });
    }

    public removeProtocols() {
        if (!this._isAdd) {
            return;
        }
        this._isAdd = false;
        this._protocolDic.forEach((v, k) => {
            v.socketMgr.off(k, this._protocolFuncDic.get(k)!);
        });
    }

    public sendMsg(cmd: string, msg: any) {
        OnlineSocketMgr.sendMsg(cmd, msg);
    }

    public sendNotify(cmd: string, msg: any) {
        OnlineSocketMgr.sendNotify(cmd, msg);
    }

    getDataByCMD(cdm: string) {
        return this._protocolDataDic.get(cdm);
    }

    clearCMDData() {
        this._protocolDataDic.clear();
    }
}
