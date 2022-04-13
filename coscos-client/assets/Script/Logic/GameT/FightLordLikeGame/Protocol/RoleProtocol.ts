import {ProtocolBase} from "../../../Base/ProtocolBase";
import {GamePushRoute} from "../../../../constant/Route";
import {RoleController} from "../Controller/RoleController";
import {
    OnPlayerPlayMessage,
    OnPlayerRoundMessage,
    OnReceivedPokerMessage
} from "../../../../constant/clientDto/Server2ClientDto";
import {FightLordLikeGame} from "../FightLordLikeGame";

export class RoleProtocol extends ProtocolBase {
    private roleController: RoleController

    constructor(controller: RoleController) {
        super();
        this.roleController = controller;
    }

    protected initProtocols() {
        this.initProtocol(GamePushRoute.OnReceivedPoker, this.OnReceivedPoker.bind(this));
        this.initProtocol(GamePushRoute.OnPlayerRound, this.OnPlayerRound.bind(this));
        this.initProtocol(GamePushRoute.OnPlayerPlay, this.OnPlayerPlay.bind(this));
    }

    private OnReceivedPoker(message: OnReceivedPokerMessage) {
        FightLordLikeGame.instance.addLadedOperate(this.roleController.OnReceivedPoker.bind(this.roleController), [message]);
    }

    private OnPlayerRound(message: OnPlayerRoundMessage) {
        FightLordLikeGame.instance.addLadedOperate(this.roleController.OnPlayerRound.bind(this.roleController), [message]);
    }

    private OnPlayerPlay(message: OnPlayerPlayMessage) {
        FightLordLikeGame.instance.addLadedOperate(this.roleController.OnPlayerPlay.bind(this.roleController), [message]);
    }

}