import {GameState} from "../../interface";
import {StandRule} from "../standRule";
import {StateBase} from "./stateBase";
import {StateDeal} from "./stateDeal";
import {StateRound} from "./stateRound";
import {StateGameOver} from "./stateGameOver";
import {StateStart} from "./stateStart";

export function RoomStateFactory(state: GameState, standRule: StandRule): StateBase {
    switch (state) {
        case GameState.Deal:
            return new StateDeal(standRule)
        case GameState.Round:
            return new StateRound(standRule)
        case GameState.GameOver:
            return new StateGameOver(standRule)
        case GameState.Start:
            return new StateStart(standRule)
    }
}