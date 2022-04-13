import {ControllerBase} from "../../../Base/ControllerBase";
import {GameProtocol} from "../Protocol/GameProtocol";
import {OnFightLordLikePhaseMessage} from "../../../../constant/clientDto/Server2ClientDto";

export class GameController extends ControllerBase {
    protected onInit() {
        //子类重写此方法
        this._protocolIns = new GameProtocol(this);
        this.addProtocol();
    }

    protected onFinalize() {
        //子类重写此方法
    }

    protected initEvents() {
        //初始化事件列表
    }

    OnFightLordLikePhase(message: OnFightLordLikePhaseMessage) {

    }
}