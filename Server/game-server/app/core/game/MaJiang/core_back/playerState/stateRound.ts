import {StateBase} from "./stateBase";
import {Player, PlayerState} from "../player";

export class StateRound extends StateBase {
    state: PlayerState.Round;


    public constructor(player: Player) {
        super(player);
    }

    deal() {
        const time = 20;
    }
}