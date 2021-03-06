import {FrontendSession, pinus, RemoterClass} from "pinus";
import {LogicRemote} from "../remote/logicRemote";

export class LogicProxy {
    private static _instance: LogicProxy;
    private logicRemote: RemoterClass<FrontendSession, LogicRemote>;

    private constructor() {
        // 单例
        this.logicRemote = pinus.app.rpc.logic.logicRemote;
    }

    async getRandomServerId() {
        return "logic-server-1";
    }

    async getLogicServerId(uid: string) {
        return "logic-server-1";
    }


    public static getInstance(): LogicProxy {
        if (this._instance) return this._instance;
        this._instance = new LogicProxy();
        return this._instance
    }

    public async userLogin(info: any, params: { sid: number, fid: string }): Promise<any> {
        const svrId = await this.getRandomServerId();
        return await this.logicRemote.Login.toServer(svrId, info, params)
    }


    public async generateRoomPlayer(uid: string): Promise<any> {
        const svrId = await this.getLogicServerId(uid);
        return await this.logicRemote.generateRoomPlayer.toServer(svrId, uid)
    }

}