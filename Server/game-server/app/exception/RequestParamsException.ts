import {AbstractException} from "./AbstractException";
import {ErrorCode} from "../constant/ErrorCode";

export class RequestParamsException extends AbstractException {

    public constructor(code: ErrorCode, message?: string) {
        super();
        this.code = code;
        this.message = message ?? "error";
        this.stack = (new Error()).stack;
    }

}