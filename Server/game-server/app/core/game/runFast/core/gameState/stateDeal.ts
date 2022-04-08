import {StateBase} from "./stateBase";
import {StandRule} from "../standRule";
import {GameState} from "../../interface";

export class StateDeal extends StateBase {
    state: GameState = GameState.Deal;

    public constructor(standRule: StandRule) {
        super(standRule);
    }

    deal() {
        this.phaseTime = 3;
        this.sendPhaseMessage(this.makeStateMessage());

        const cardNumberPerPlayer = this.game.config.playerCardsNumber;

        this.playerList.forEach(player => {
            this.table.sendCardToSomeBody(player, cardNumberPerPlayer);
        })
    }

}