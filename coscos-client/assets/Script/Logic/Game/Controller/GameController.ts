import {ControllerBase} from "../../Base/ControllerBase";
import {GameProtocol} from "../Protocol/GameProtocol";
import UIGamePoker from "../../../UIScript/Screen/UIGamePoker";
import {GAME_CMD} from "../Const/GameCmd";
import PokerGame from "../PokerGame";

export default class GameController extends ControllerBase {
    pokerRankSort: Array<number> = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2]


    protected onInit() {
        //子类重写此方法
        this._protocolIns = new GameProtocol(this);
        this.addProtocol();
    }

    onLoadingFinish() {

    }

    public bindRoomData() {

    }

    handleGameStateChanged(message: any) {
        if (message.phase == 1) {
            UIGamePoker.inst.view.StartGame.node.active = false;
        }

        if (message.phase == 4) {
            PokerGame.instance.roomController.UIShowStartGameButton();
            PokerGame.instance.roleController.UIDisableGameOperate();
            PokerGame.instance.roleController.UIDisableAllRoundTime();
            PokerGame.instance.roleController.UIDisableAllCards();
        }
    }

    cardsSort(cards) {
        return cards.sort((eleA, eleB) => {
            return this.pokerRankSort.indexOf(eleB.rank) - this.pokerRankSort.indexOf(eleA.rank);
        })
    }

    // 出牌
    playCard() {
        const message = {
            roomId: PokerGame.instance.roomController.roomId,
            cards: PokerGame.instance.roleController.getSelectCards(),
        }
        this.sendMsg(GAME_CMD.RequestPokerGamePlay, message)
    }
}