import {Application, RemoterClass, FrontendSession} from 'pinus';
import {LogicServer} from "../instance/logicServer";

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

    public async Login(info: any, params: { sid: number, fid: string }) {
        return await LogicServer.getInstance().userLogin(info, params)
    }

    public async generateRoomPlayer(uid: string): Promise<any> {
        return await LogicServer.getInstance().generateRoomPlayer(uid)
    }
}