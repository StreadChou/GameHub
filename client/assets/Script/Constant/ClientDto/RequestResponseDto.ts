import {ErrorCode} from "../ErrorCode";
import {Client2ServerCmd} from "../Route";


export class DefaultResponse<T> {
    code: ErrorCode
    data?: T
    message?: string
}

export type RequestResponseDto = {
    [Client2ServerCmd.Login]: {
        request: {},
        response: {}
    };
    [Client2ServerCmd.CreateRoom]: {
        request: {},
        response: DefaultResponse<{
            uid: string
            roomId: number
        }>
    };
    [Client2ServerCmd.JoinRoom]: {
        request: {},
        response: DefaultResponse<{
            roomId: number
        }>
    };
    [Client2ServerCmd.LeaveRoom]: {
        request: {},
        response: DefaultResponse<{
            roomId: number
        }>
    };
    [Client2ServerCmd.StartGame]: {
        request: {},
        response: DefaultResponse<{
            roomId: number
        }>
    };

    [Client2ServerCmd.GameEvent]: {
        request: {},
        response: {}
    };
}

