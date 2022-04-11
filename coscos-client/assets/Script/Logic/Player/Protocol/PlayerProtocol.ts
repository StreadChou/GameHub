import {ProtocolBase} from "../../Base/ProtocolBase";
import {PlayerController} from "../Controller/PlayerController";
import {PLAYER_CMD} from "../Const/PlayerCmd";

export class PlayerProtocol extends ProtocolBase {
    private _controller: PlayerController;

    constructor(controller: PlayerController) {
        super();
        this._controller = controller;
    }

    protected initProtocols() {
        this.initProtocol(PLAYER_CMD.OnLogin, this.OnLogin.bind(this));
    }

    protected OnLogin(msg: any) {
        this._controller.OnLogin(msg);
    }

}