export class CMD {
    static HEARTBEAT_TIMEOUT = "onHeartbeatTimeout";
    static SOCKET_CONNECT_SUCCEED = "onSocketConnectSucceed";
    static SOCKET_DISCONNECT = "onSocketDisConnect";
    static SOCKET_CONNECT_FAILED = "onSocketConnectFailed";
    static SOCKET_TRY_RECONNECT = "onSocketTryReconnect";
}


export const CMD_ERROR_FILTER: Set<string> = new Set<string>([]);