import {ErrorCode} from "../../object/ErrorCode";

export abstract class AbstractException extends Error {
    errorCode: ErrorCode

    protected constructor(code: ErrorCode, message?: string) {
        super(message);
        this.errorCode = code;
    }

    generateErrorResponse() {
        return {
            code: this.errorCode,
        }
    }


}