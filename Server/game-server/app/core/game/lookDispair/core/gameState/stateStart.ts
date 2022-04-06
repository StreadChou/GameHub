import {StateBase} from "./stateBase";
import {GameState} from "../../interface";
import {StandRule} from "../standRule";
import {LookDespairGameRoute} from "../../../../../constant/Route";

export class StateStart extends StateBase {
    state: GameState = GameState.Start;

    public constructor(standRule: StandRule) {
        super(standRule);
    }

    deal() {
        // 确定先手;

        const message = {};
        this.game.pushMessage(LookDespairGameRoute.LookDespairGameStart, message);
    }

}