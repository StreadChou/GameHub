import {StateBase} from "./stateBase";
import {GameState} from "../../interface";
import {StandRule} from "../standRule";
import {PokerCard} from "../../../core/poker/pokerCard";

export class StateRound extends StateBase {
    state: GameState = GameState.Round;


    public constructor(standRule: StandRule) {
        super(standRule);
    }

    deal() {
        this.sendPhaseMessage(this.makeStateMessage());
        // 通知别人出牌
    }

    public transition = () => {

    }


}