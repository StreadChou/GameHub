import {Application, FrontendSession} from 'pinus';
import {ErrorCode} from "../../../../object/ErrorCode";
import {LogicProxy} from "../../logic/proxy/logicProxy";
import {randomNumberBetween} from "../../../helper/randomHelper";
import {ClientException} from "../../../exception/clientException";
import {AppConfig, SessionAttr} from "../../../constant/App";
import {C2SGuestLoginVO, C2SLoginVO} from "../../vo";
import * as util from "util";
import * as requestModule from "request";
import {PlayerLoginResponseDto} from "../../../constant/RpcDto";

const request = util.promisify(requestModule);

export default function (app: Application) {
    return new Handler(app);
}


const loginSuccess = async (session: FrontendSession, loginRes: PlayerLoginResponseDto) => {
    session.set(SessionAttr.LogicServerId, loginRes.logicServerId);
    await session.abind(loginRes.uid);
    await session.apushAll()
}

export class Handler {
    constructor(private app: Application) {

    }

    async guestLogin(msg: C2SGuestLoginVO, session: FrontendSession) {
        const aid: number = parseInt(Date.now().toString() + randomNumberBetween(1000, 9999));
        const nick: string = "游客"
        const cover: string = AppConfig.AuthServerUrl + "static/cover/1.png"
        const res = await LogicProxy.getInstance().userLogin({aid, cover, nick}, {
            sid: session.id,
            fid: session.frontendId
        })
        await loginSuccess(session, res);
        return {code: ErrorCode.Success, data: {}};
    }

    async accountLogin(message: C2SLoginVO, session: FrontendSession) {
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
        const {aid, cover, nick} = (await request(options)).body;
        if (!aid || !cover || !nick) throw new ClientException(ErrorCode.LoginError, {}, "登录失败,请稍后重试");
        const res = await LogicProxy.getInstance().userLogin({aid, cover, nick}, {
            sid: session.id,
            fid: session.frontendId
        })
        await loginSuccess(session, res);
        return {code: ErrorCode.Success, data: {}};
    }


}
