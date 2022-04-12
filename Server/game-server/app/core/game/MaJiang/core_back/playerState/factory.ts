import {Player, PlayerState} from "../player";
import {StateBase} from "./stateBase";
import {StateWait} from "./stateWait";
import {StateDeal} from "./stateDeal";
import {StateRound} from "./stateRound";

export function PlayerStateFactory(state: PlayerState, player: Player): StateBase {
    switch (state) {
        case PlayerState.Wait:
            return new StateWait(player);
        case PlayerState.Deal:
            return new StateDeal(player);
        case PlayerState.Round:
            return new StateRound(player);
    }
}