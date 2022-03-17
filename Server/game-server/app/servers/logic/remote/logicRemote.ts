import {Application, RemoterClass, FrontendSession} from 'pinus';
import {User} from "../../../core/logic/user/user";

export default function (app: Application) {
    return new LogicRemote(app);
}

// UserRpc的命名空间自动合并
declare global {
    interface UserRpc {
        logic: {
            // 一次性定义一个类自动合并到UserRpc中
            authRemoter: RemoterClass<FrontendSession, LogicRemote>;
        };
    }
}


export class LogicRemote {
    constructor(private app: Application) {

    }

    public async Login(uid) {
        await User.login(uid);
    }
}