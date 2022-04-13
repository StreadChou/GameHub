import {Application, FrontendSession, pinus} from 'pinus';
import {LoginDto} from "../dto/entryDto";
import {ErrorCode} from "../../../constant/ErrorCode";
import {dispatchRandom} from "../../../helper/routeHelper";
import {LogicProxy} from "../../logic/proxy/logicProxy";
import {PlayerAuthInfo} from "../../../core/user/dto/userDto";
import {randomNumberBetween} from "../../../helper/randomHelper";
import {ClientException} from "../../../exception/clientException";
import {SessionAttr} from "../../../constant/App";

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    async login(msg: LoginDto, session: FrontendSession) {
        let {uid, token} = msg;
        if (!uid || !token) {
            throw new ClientException(ErrorCode.LoginTokenCheckError, {}, "登录Token错误");
        }
        // TODO 验证数据
        console.log(uid, token)
        await pinus.app.sessionService.akick(uid); // TODO T出原因
        await session.abind(uid);
        const logicId = dispatchRandom("logic", uid).id;
        const cover = [
            "http://static.stread.net/test/1.jpg",
            "http://static.stread.net/test/2.jpg",
            "http://static.stread.net/test/3.jpg",
            "http://static.stread.net/test/4.jpg",
            "http://static.stread.net/test/5.jpg",
        ]
        const info: PlayerAuthInfo = {
            nick: `测试账号${randomNumberBetween(100, 999)}`,
            cover: cover[randomNumberBetween(0, 4)]
        }
        await LogicProxy.getInstance().userLogin(uid, info, {sid: session.id, fid: session.frontendId}
        )
        ;
        session.set(SessionAttr.LogicServerId, logicId);
        await session.apushAll()
        return {code: ErrorCode.Success, data: {}};
    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     */
    async entry(msg: any, session: FrontendSession) {
        return {code: 200, msg: 'gameState server is ok.'};
    }

    /**
     * Publish route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     */
    async publish(msg: any, session: FrontendSession) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
        };
        return result;
    }

    /**
     * Subscribe route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     */
    async subscribe(msg: any, session: FrontendSession) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
        };
        return result;
    }

}