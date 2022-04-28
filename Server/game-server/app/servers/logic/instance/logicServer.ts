import {User} from "../../../core/user/user";
import {pinus} from "pinus";
import {UserServices} from "../../../core/user/services/userServices";
import {PlayerLoginRequestDto, PlayerLoginResponseDto, RoomPlayerInitDto} from "../../../constant/RpcDto";
import {S2COnLogin} from "../../vo";
import {PlayerPushRoute} from "../../../constant/Route";

export class LogicServer {
    private static _instance: LogicServer
    svrId: string;
    userServices: UserServices;


    userUidMap: { [uid in string]: User } = {}

    private constructor() {
        this.svrId = pinus.app.getServerId();
        this.userServices = UserServices.getInstance();
    }

    public static getInstance(): LogicServer {
        this._instance = this._instance ?? new LogicServer();
        return this._instance;
    }

    // 获取用户
    public getUser(uid: string): User {
        return this.userUidMap[uid];
    }

    public async userLogin(info: PlayerLoginRequestDto, params: { sid: number, fid: string }): Promise<PlayerLoginResponseDto> {
        const userEntity = await this.userServices.queryOrCreateUser(info);
        const user = User.loadFromEntity(userEntity);
        user.sid = params.sid;
        user.fid = params.fid;
        this.userUidMap[user.uid] = user;
        user.pushMessage(PlayerPushRoute.OnLogin, user.makeOnLoinSuccessMessage());
        return {logicServerId: pinus.app.getServerId(), uid: user.uid};
    }

    public async generateRoomPlayer(uid: string): Promise<RoomPlayerInitDto> {
        const user: User = this.getUser(uid);
        return user.makeRoomNeed()
    }


}