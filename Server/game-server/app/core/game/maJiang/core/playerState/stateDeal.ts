import {StateBase} from "./stateBase";
import {Player, PlayerState} from "../player";

export class StateDeal extends StateBase {
    state: PlayerState.Deal;


    public constructor(player: Player) {
        super(player);
    }

    deal() {
        // 玩家需要接的牌
        let number = this.game.getConfig("playerCardsNumber") - this.player.cardNumber;
        const maJiang = 1;
    }
}