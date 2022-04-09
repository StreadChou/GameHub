import {StateBase} from "./stateBase";
import {GameState} from "../../interface";
import {StandRule} from "../standRule";
import {PokerCard} from "../../../core/poker/pokerCard";
import {randomNumberBetween} from "../../../../../helper/randomHelper";

export class StateRound extends StateBase {
    state: GameState = GameState.Round;


    public constructor(standRule: StandRule) {
        super(standRule);
    }

    deal() {
        this.sendPhaseMessage(this.makeStateMessage());
        this.table.enterPlayerRound(this.game.playerList[randomNumberBetween(0, this.game.playerList.length - 1)]);
    }

    public transition = () => {

    }


}