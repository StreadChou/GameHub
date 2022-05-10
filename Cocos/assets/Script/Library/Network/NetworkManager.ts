import {CMD} from "./CmdDef";
import {OnlineSocketMgr} from "./OnlineSocketManager";
import {EventSystem} from "../EventSystem/EventSystem";
import {EVENT} from "../EventSystem/EventDefine";

/**
 * 网络连接管理
 */
export class NetworkManager {
    private static _instance: NetworkManager | null;
    static get instance() {
        if (!this._instance) {
            this._instance = new NetworkManager();

        }
        return this._instance;
    }

    constructor() {
        OnlineSocketMgr.on(CMD.SOCKET_CONNECT_SUCCEED, this.onMainSocketConnectSucceed.bind(this));
        OnlineSocketMgr.on(CMD.SOCKET_CONNECT_FAILED, this.onMainSocketConnectFail.bind(this));
        OnlineSocketMgr.on(CMD.SOCKET_DISCONNECT, this.onMainSocketDisconnect.bind(this));
    }

    /**
     * 打开主Socket的连接
     * @param ip
     * @param port
     */
    openMainSocket(ip: string, port: number) {
        OnlineSocketMgr.removeControl();
        OnlineSocketMgr.IP = ip;
        OnlineSocketMgr.Port = port;
        OnlineSocketMgr.openSocket();
    }

    closeMainSocket() {
        OnlineSocketMgr.closeSocket();
    }

    protected onMainSocketConnectSucceed() {
        EventSystem.instance.fire(EVENT.ON_SOCKET_CONNECT_SUCCEED);
    }

    protected onMainSocketConnectFail() {
        EventSystem.instance.fire(EVENT.ON_SOCKET_CONNECT_FAILED);
    }

    protected onMainSocketDisconnect() {
        EventSystem.instance.fire(EVENT.ON_SOCKET_DISCONNECT);
    }

    update() {
        OnlineSocketMgr.handleMsg();
    }
}