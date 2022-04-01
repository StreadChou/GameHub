import {User} from "../../../core/user/user";
import {pinus} from "pinus";

export class LogicServer {
    private static _instance: LogicServer
    svrId: string;
    userUidMap: { [uid in string]: User }

    private constructor() {
        this.svrId = pinus.app.getServerId();
    }

    public static getInstance(): LogicServer {
        this._instance = this._instance ?? new LogicServer();
        return this._instance;
    }

    // 获取用户
    public async getUser(uid: string): Promise<User> {
        return this.userUidMap[uid];
    }

    public async userLogin(uid: string) {
        
    }


}