import {ErrorCode} from "../constant/ErrorCode";

export abstract class AbstractException {
    code: ErrorCode;
    message: string;
    data: { [key in string | number]: any };
    stack: string

    generateErrorResponse() {
        return {
            code: this.code,
            data: this.data,
        }
    }
}