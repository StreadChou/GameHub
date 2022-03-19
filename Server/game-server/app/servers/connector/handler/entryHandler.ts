import {Application, FrontendSession} from 'pinus';
import {LoginDto} from "../dto/entryDto";
import {RequestParamsException} from "../../../exception/RequestParamsException";
import {ErrorCode} from "../../../constant/ErrorCode";
import {dispatchRandom} from "../../../helper/routeHelper";

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    async login(msg: LoginDto, session: FrontendSession) {
        let {uid, token} = msg;
        if (!uid || !token) {
            throw new RequestParamsException(ErrorCode.LOGIN_TOKEN_CHECK_ERROR);
        }
        // TODO 验证数据
        console.log(uid, token)

        await session.abind(uid);
        await this.app.rpc.logic.logicRemote.Login.toServer(dispatchRandom("logic", uid).id, uid);
        return {};
    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     */
    async entry(msg: any, session: FrontendSession) {
        return {code: 200, msg: 'game server is ok.'};
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