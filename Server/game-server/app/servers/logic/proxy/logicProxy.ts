import {FrontendSession, pinus, RemoterClass} from "pinus";
import {dispatchUserLogic} from "../../../helper/routeHelper";
import {LogicRemote} from "../remote/logicRemote";
import {RoomPlayerInitDto} from "../../../core/room/dto/RoomDto";

export class LogicProxy {
    private static _instance: LogicProxy;
    private logicRemote: RemoterClass<FrontendSession, LogicRemote>;

    private constructor() {
        // 单例
        this.logicRemote = pinus.app.rpc.logic.logicRemote;
    }

    public static getInstance(): LogicProxy {
        if (this._instance) return this._instance;
        this._instance = new LogicProxy();
        return this._instance
    }


    public async generateRoomPlayer(uid: string): Promise<RoomPlayerInitDto> {
        return await this.logicRemote.generateRoomPlayer.toServer(dispatchUserLogic(uid), uid)
    }

}