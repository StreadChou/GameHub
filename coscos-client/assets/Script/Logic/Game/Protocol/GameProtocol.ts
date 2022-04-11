import GameController from "../Controller/GameController";
import {ProtocolBase} from "../../Base/ProtocolBase";
import {GAME_CMD} from "../Const/GameCmd";


export class GameProtocol extends ProtocolBase {
    private _controller: GameController;

    constructor(controller: GameController) {
        super();
        this._controller = controller;
    }

    protected initProtocols() {
        this.initProtocol(GAME_CMD.OnPhase, this.onGameStateChanged.bind(this));
    }

    onGameStateChanged(msg: any) {
        this._controller.handleGameStateChanged();
    }
}