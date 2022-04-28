import {Application, FrontendSession} from 'pinus';
import {ErrorCode} from "../../../constant/ErrorCode";
import {LogicProxy} from "../../logic/proxy/logicProxy";
import {randomNumberBetween} from "../../../helper/randomHelper";
import {ClientException} from "../../../exception/clientException";
import {AppConfig, SessionAttr} from "../../../constant/App";
import * as util from "util";
import * as requestModule from "request";

const request = util.promisify(requestModule);

export default function (app: Application) {
    return new Handler(app);
}


const loginSuccess = async (session: FrontendSession, loginRes: any) => {
    session.set(SessionAttr.LogicServerId, loginRes.logicServerId);
    await session.abind(loginRes.uid);
    await session.apushAll()
}

export class Handler {
    constructor(private app: Application) {

    }

    async guestLogin(msg: any, session: FrontendSession) {
        const aid: number = parseInt(Date.now().toString() + randomNumberBetween(10000, 99999));
        const nick: string = "游客"
        const cover: string = AppConfig.AuthServerUrl + "static/cover/1.png"
        const res = await LogicProxy.getInstance().userLogin({aid, cover, nick}, {
            sid: session.id,
            fid: session.frontendId
        })
        await loginSuccess(session, res);
        return {code: ErrorCode.Success, data: {}};
    }

    async accountLogin(message: any, session: FrontendSession) {
        const token = message.token;
        const options = {
            'method': 'POST',
            'url': AppConfig.AuthServerUrl + 'auth/checkToken',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": token
            })
        };
        const authResponse = await request(options)
        const {aid, cover, nick} = JSON.parse(authResponse.body);
        if (!aid || !nick) throw new ClientException(ErrorCode.LoginError, {}, "登录失败,请稍后重试");
        const res = await LogicProxy.getInstance().userLogin({aid, cover, nick}, {
            sid: session.id,
            fid: session.frontendId
        })
        await loginSuccess(session, res);
        return {code: ErrorCode.Success, data: {}};
    }


}
