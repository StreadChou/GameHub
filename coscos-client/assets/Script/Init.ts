import FormMgr from "./UIFrame/FormMgr";
import UIConfig from "./UIConfig";
import {NetworkManager} from "./Common/NetWork/NetworkManager";
import {SimpleEventMap} from "./Logic/Base/SimpleEventMap";
import {EVENT} from "./Logic/Event/EventDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Init extends cc.Component {
    eventMap: SimpleEventMap;

    onLoad() {
        this.eventMap = new SimpleEventMap();
        this.connectSocket();
    }

    start() {
        FormMgr.open(UIConfig.UILogin, null);
    }

    connectSocket() {
        NetworkManager.instance.openMainSocket("127.0.0.1", 3010);

        this.eventMap.registerEvent(EVENT.ON_SOCKET_CONNECT_SUCCEED, this.onOnlineSocketConnectSucceed);
        this.eventMap.registerEvent(EVENT.ON_SOCKET_CONNECT_FAILED, this.onOnlineSocketConnectFailed);
        this.eventMap.registerEvent(EVENT.ON_SOCKET_DISCONNECT, this.onOnlineSocketDisconnect);
        this.eventMap.registerEvent(EVENT.ON_ERROR_CODE, this.onErrorCode);
    }

    protected onOnlineSocketConnectSucceed() {
        cc.log("onOnlineSocketConnectSucceed")
    }

    protected onOnlineSocketConnectFailed() {
        cc.log("onOnlineSocketConnectFailed")
    }

    protected onOnlineSocketDisconnect() {
        cc.log("onOnlineSocketDisconnect")
    }

    protected onErrorCode({code, data, message}) {
        return FormMgr.open(UIConfig.UINotice, message)
    }
}
