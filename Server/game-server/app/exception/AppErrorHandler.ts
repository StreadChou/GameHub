import {FrontendOrBackendSession, ResponseErrorHandler} from 'pinus';
import {HandlerCallback} from "pinus/lib/common/service/handlerService";
import {AbstractException} from "./AbstractException";

export const DefaultErrorHandler: ResponseErrorHandler = function (err: any, msg: any, resp: any, session: FrontendOrBackendSession, cb: HandlerCallback) {
    if (err instanceof Error) {
        return cb(err, {code: 500});
    }
    if (err instanceof AbstractException) {
        return cb(new Error(), err.generateErrorResponse());
    }
}