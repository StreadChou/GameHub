import {User} from "../../../core/user/user";
import {pinus} from "pinus";
import {UserServices} from "../../../core/user/services/userServices";

export class LogicServer {
    private static _instance: LogicServer
    svrId: string;
    userServices: UserServices;


    userUidMap: { [uid in string]: User }

    private constructor() {
        this.svrId = pinus.app.getServerId();
        this.userServices = UserServices.getInstance();
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
        const userEntity = await this.userServices.queryOrCreateUser(uid);
        console.log(userEntity);
    }


}