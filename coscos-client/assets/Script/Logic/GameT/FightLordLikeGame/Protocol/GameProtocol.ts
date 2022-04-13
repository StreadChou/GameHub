import {ProtocolBase} from "../../../Base/ProtocolBase";
import {GamePushRoute} from "../../../../constant/Route";
import {OnFightLordLikePhaseMessage} from "../../../../constant/clientDto/Server2ClientDto";
import {GameController} from "../Controller/GameController";
import {FightLordLikeGame} from "../FightLordLikeGame";

export class GameProtocol extends ProtocolBase {
    private readonly gameController: GameController

    constructor(controller: GameController) {
        super();
        this.gameController = controller;
    }

    protected initProtocols() {
        this.initProtocol(GamePushRoute.OnFightLordLikePhase, this.OnFightLordLikePhase.bind(this));
    }

    private OnFightLordLikePhase(message: OnFightLordLikePhaseMessage) {
        FightLordLikeGame.instance.addLadedOperate(this.gameController.OnFightLordLikePhase.bind(this.gameController), [message]);
    }
}