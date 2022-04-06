import {StateBase} from "./stateBase";
import {Player, PlayerState} from "../player";

export class StateWait extends StateBase {
    state: PlayerState.Wait;

    public constructor(player: Player) {
        super(player);
    }

    deal() {
    }
}