import {StateBase} from "./stateBase";
import {StandRule} from "../standRule";
import {GameState} from "../../interface";

export class StateDeal extends StateBase {
    state: GameState = GameState.Deal;

    public constructor(standRule: StandRule) {
        super(standRule);
    }

    deal() {

    }

}