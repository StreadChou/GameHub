export class CMD {
    static HEARTBEATTIMEOUT = "onHeartbeatTimeout";
    static SOCKET_CONNECT_SUCCEED = "onSocketConnectSucceed";
    static SOCKET_DISCONNECT = "onSocketDisConnect";
    static SOCKET_CONNECT_FAILED = "onSocketConnectFailed";
    static SOCKET_TRY_RECONNECT = "onSocketTryReconnect";
}


export const CMD_ERROR_FILTER: Set<string> = new Set<string>([]);

/**
 * 这里的错误码统一用飘条形式提示
 */
export const STRING_TIPS_CODE = [305];