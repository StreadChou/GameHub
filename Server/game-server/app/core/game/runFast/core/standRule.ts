import {Game} from "./game";
import {BuildTransition, StateMachine, STOptions} from "../../../../helper/stateMachine";
import {GameFsmInterface, GameState} from "../interface";
import {StateBase} from "./gameState/stateBase";
import {RoomStateFactory} from "./gameState/factory";

export class StandRule {
    public game: Game
    fsm: StateMachine<GameFsmInterface, GameState>;
    private phaseMap: { [phase in GameState]?: StateBase } = {};

    constructor(game: Game) {
        const option: STOptions<GameFsmInterface, GameState> = {
            init: GameState.Init,
            transitions: {
                next: [
                    BuildTransition(GameState.Init, GameState.Start),
                    BuildTransition(GameState.Start, GameState.Deal),
                    BuildTransition(GameState.Deal, GameState.Round),
                    BuildTransition(GameState.Round, GameState.GameOver),
                ]
            }
        };
        this.fsm = new StateMachine<GameFsmInterface, GameState>(option)
        this.fsm.onBefore = this.onTransitionBefore.bind(this);
        this.fsm.onAfter = this.onTransitionAfter.bind(this);
        this.game = game;
    }

    get state(): GameState {
        return this.fsm.state();
    }

    public next() {
        this.fsm.transition().next();
        console.log(123);
    }


    async onTransitionBefore(currentState: GameState, toState: GameState) {
        const now: StateBase = this._getPhaseInstance(currentState)
        if (now) now.end(currentState, toState);
    }

    async onTransitionAfter(currentState: GameState, toState: GameState) {
        const now: StateBase = this._getPhaseInstance(toState)
        now.start(currentState, toState);
        if (now) now.end(currentState, toState);
        console.log("\n\n\n\n\n", currentState, toState, "\n\n\n\n\n")
    }


    private _getPhaseInstance(phase?: GameState): StateBase {
        if (!phase) phase = this.fsm.state();
        this.phaseMap[phase] = this.phaseMap[phase] ?? RoomStateFactory(phase, this);
        return this.phaseMap[phase];
    }

}