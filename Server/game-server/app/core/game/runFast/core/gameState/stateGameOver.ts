import {StateBase} from "./stateBase";
import {GameState} from "../../interface";
import {StandRule} from "../standRule";

export class StateGameOver extends StateBase {
    state: GameState = GameState.GameOver;

    public constructor(standRule: StandRule) {
        super(standRule);
    }

    deal() {
        this.sendPhaseMessage(this.makeStateMessage());
    }

}