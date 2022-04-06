import {StateBase} from "./stateBase";
import {GameState} from "../../interface";
import {StandRule} from "../standRule";

export class StateRound extends StateBase {
    state: GameState = GameState.Round;

    public constructor(standRule: StandRule) {
        super(standRule);
    }

    deal() {

    }

}