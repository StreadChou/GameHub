import RunFastGame from "./RunFastGame";
import {BuildTransition, ITransitionDir, StateMachine, STOptions} from "../../../../../helper/stateMachine";
import {GamePushRoute} from "../../../../../constant/Route";
import * as process from "process";
import {PushOperation} from "./Operation";

export interface RunFastGameFsmInterface {
    next: Array<ITransitionDir<GameState>>,
}

export enum GameState {
    Init,  // 开始阶段
    Start, // 初始化阶段
    Deal, // 发牌阶段
    Round, // 打牌阶段
    GameOver, // 结束阶段, 结算阶段
}

// 因为跑的快的游戏阶段十分简单, 直接在内部写
export class RunFastStandRule {
    public game: RunFastGame
    fsm: StateMachine<RunFastGameFsmInterface, GameState>;
    timer: NodeJS.Timeout;

    constructor(game: RunFastGame) {
        const option: STOptions<RunFastGameFsmInterface, GameState> = {
            init: GameState.Init,
            transitions: {
                next: [
                    BuildTransition(GameState.Init, GameState.Start),
                    BuildTransition(GameState.Start, GameState.Deal, this.stateDeal.bind(this)),
                    BuildTransition(GameState.Deal, GameState.Round, this.stateRound.bind(this)),
                    BuildTransition(GameState.Round, GameState.GameOver),
                ]
            }
        };
        this.fsm = new StateMachine<RunFastGameFsmInterface, GameState>(option)
        this.fsm.onAfter = this.onTransitionAfter.bind(this);
        this.game = game;
        this.next();
    }

    get state(): GameState {
        return this.fsm.state();
    }

    public next() {
        this.fsm.transition().next();
    }


    async onTransitionAfter(currentState: GameState, toState: GameState) {
        const message: any = {
            phase: this.state,
            time: 0,
        }
        switch (toState) {
            case GameState.Init:
                message.time = 0;
                break;
            case GameState.Start:
                message.time = 0;
                break;
            case GameState.Deal:
                message.time = 2;
                break;
            case GameState.Round:
                message.time = -1;
                break;
            case GameState.GameOver:
                message.time = 0;
                break;
        }
        this.game.pushMessage(PushOperation.OnPhase, message);

        if (message.time > 0) {
            setTimeout(() => {
                this.next()
            }, message.time * 1000)
        } else if (message.time == 0) {
            process.nextTick(() => {
                this.next()
            })
        }
    }

    stateDeal() {
        const pokerNumberPerPlayer = this.game.gameConfig.pokerNumber;
        this.game.players.forEach(player => {
            this.game.table.sendPokerToPlayer(player, pokerNumberPerPlayer);
        })
    }

    stateRound() {
        this.game.referee.enterNextPlayerRound();
    }


}