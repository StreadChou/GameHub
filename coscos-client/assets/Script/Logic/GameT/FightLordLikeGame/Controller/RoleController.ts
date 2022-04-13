import {ControllerBase} from "../../../Base/ControllerBase";
import {RoleProtocol} from "../Protocol/RoleProtocol";
import {
    OnPlayerPlayMessage,
    OnPlayerRoundMessage,
    OnReceivedPokerMessage
} from "../../../../constant/clientDto/Server2ClientDto";

export class RoleController extends ControllerBase {
    protected onInit() {
        //子类重写此方法
        this._protocolIns = new RoleProtocol(this);
        this.addProtocol();
    }

    protected onFinalize() {
        //子类重写此方法
    }

    protected initEvents() {
        //初始化事件列表
    }

    public OnReceivedPoker(message: OnReceivedPokerMessage) {
        //
    }

    public OnPlayerRound(message: OnPlayerRoundMessage) {

    }

    public OnPlayerPlay(message: OnPlayerPlayMessage) {

    }
}