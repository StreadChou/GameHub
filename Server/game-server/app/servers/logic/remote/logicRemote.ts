import {Application, RemoterClass, FrontendSession} from 'pinus';
import {User} from "../../../core/user/user";
import {RoomPlayerInitDto} from "../../../core/room/dto/RoomDto";
import {LogicServer} from "../instance/logicServer";
import {PlayerAuthInfo} from "../../../core/user/dto/userDto";

export default function (app: Application) {
    return new LogicRemote(app);
}

// UserRpc的命名空间自动合并
declare global {
    interface UserRpc {
        logic: {
            // 一次性定义一个类自动合并到UserRpc中
            logicRemote: RemoterClass<FrontendSession, LogicRemote>;
        };
    }
}


export class LogicRemote {
    private serverId: string;

    constructor(private app: Application) {

    }

    public async Login(uid: string, info: PlayerAuthInfo, params: { sid: number, fid: string }) {
        return await LogicServer.getInstance().userLogin(uid, info, params)
    }

    public async generateRoomPlayer(uid: string): Promise<RoomPlayerInitDto> {
        return await LogicServer.getInstance().generateRoomPlayer(uid)
    }
}