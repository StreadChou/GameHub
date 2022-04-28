import {AbstractException} from "./abstractException";
import {ErrorCode} from "../../object/ErrorCode";

export class ClientException extends AbstractException {
    errorData: any;

    public constructor(code: ErrorCode, data?: any, message?: string) {
        super(code, message);
        this.errorCode = code;
        this.errorData = data;
    }

    generateErrorResponse() {
        return {
            code: this.errorCode,
            data: this.errorData,
            message: this.message,
        }
    }
}