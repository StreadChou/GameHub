import {FrontendOrBackendSession, ResponseErrorHandler} from 'pinus';
import {HandlerCallback} from "pinus/lib/common/service/handlerService";
import {AbstractException} from "../abstractException";

export const AppErrorHandler: ResponseErrorHandler = function (err: any, msg: any, resp: any, session: FrontendOrBackendSession, cb: HandlerCallback) {
    // 如果是客户端异常
    if (err instanceof AbstractException) {
        return cb(err, err.generateErrorResponse());
    }

    if (err instanceof Error) {
        console.error(err.message, err.stack);
        return cb(err, {code: 500});
    }

    if (typeof err === "object"){
        console.error(err.stack);
    }
}