import GameController from "../Controller/GameController";
import {ProtocolBase} from "../../Base/ProtocolBase";
import {GAME_CMD} from "../Const/GameCmd";
import PokerGame from "../PokerGame";


export class GameProtocol extends ProtocolBase {
    private _controller: GameController;

    constructor(controller: GameController) {
        super();
        this._controller = controller;
    }

    protected initProtocols() {
        this.initProtocol(GAME_CMD.OnPhase, this.onGameStateChanged.bind(this));
        this.initProtocol(GAME_CMD.OnReceivedPoker, this.OnReceivedPoker.bind(this));
        this.initProtocol(GAME_CMD.OnPlayerRound, this.OnPlayerRound.bind(this));
        this.initProtocol(GAME_CMD.OnPlayerPlay, this.OnPlayerPlay.bind(this));
    }

    onGameStateChanged(message: any) {
        this._controller.handleGameStateChanged(message);
    }

    OnReceivedPoker(message) {
        PokerGame.instance.roleController.OnReceivedPoker(message)
    }

    OnPlayerRound(message) {
        PokerGame.instance.roleController.OnPlayerRound(message)
    }

    OnPlayerPlay(message) {
        PokerGame.instance.roleController.OnPlayerPlay(message)
    }
}