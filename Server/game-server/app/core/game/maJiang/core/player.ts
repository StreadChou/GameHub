import {AbstractPlayer} from "../../abstract/abstractPlayer";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {randomNumberBetween} from "../../../../helper/randomHelper";
import {PokerCard} from "../../core/poker/pokerCard";
import {EventEmitter} from "events";
import {PlayerEvent} from "../constant/event";
import {Game} from "./game";
import {BuildTransition, ITransitionDir, StateMachine, STOptions} from "../../../../helper/stateMachine";
import {StateBase} from "./playerState/stateBase";
import {PlayerStateFactory} from "./playerState/factory";

export interface PlayerFsmInterface {
    next: Array<ITransitionDir<PlayerState>>,
    goto: ITransitionDir<PlayerState>;
}

export enum PlayerState {
    Wait = 100,
    Deal,
    Round
}

export class Player extends AbstractPlayer {
    game: Game;
    fsm: StateMachine<PlayerFsmInterface, PlayerState>;
    private event: EventEmitter = new EventEmitter().setMaxListeners(50);
    private stateMap: { [key in PlayerState]: StateBase };

    firstHandRandom: number = 0;
    cards: PokerCard[] = [];


    get cardNumber(): number {
        return this.cards.length;
    }

    get state(): PlayerState {
        return this.fsm.state();
    }

    public next() {
        this.fsm.transition().next();
    }

    public goto(phase: PlayerState) {
        this.fsm.transition().goto(phase);
    }


    protected constructor(game: Game, roomPlayer: RoomPlayer) {
        super(roomPlayer);
        this.firstHandRandom = randomNumberBetween(1, 6);
        this.game = game;
    }


    protected initFsm() {
        const option: STOptions<PlayerFsmInterface, PlayerState> = {
            init: PlayerState.Wait,
            transitions: {
                next: [
                    BuildTransition(PlayerState.Wait, PlayerState.Deal, this.onTransition.bind(this)),
                    BuildTransition(PlayerState.Wait, PlayerState.Deal, this.onTransition.bind(this)),
                    BuildTransition(PlayerState.Round, PlayerState.Wait, this.onTransition.bind(this)),
                ],
                goto: BuildTransition<PlayerState>('*', state => state, this.onTransition.bind(this))
            }
        };
    }

    static generate(game: Game, roomPlayer: RoomPlayer): Player {
        return new Player(game, roomPlayer);
    }

    public on(event: PlayerEvent, listener: (...args: any[]) => void) {
        this.event.on(event, listener);
    }

    public once(event: PlayerEvent, listener: (...args: any[]) => void) {
        this.event.once(event, listener);
    }

    public emit(event: PlayerEvent, ...args: any[]) {
        this.event.emit(event, args);
    }


    public gotoState(state: PlayerState) {
        return this.fsm.transition().goto(state);
    }

    // 状态机转换
    async onTransition(currentState: PlayerState, toState: PlayerState) {
        const before = this.getPhaseInstance(currentState);
        const after = this.getPhaseInstance(toState);
        before.end();
        after.start();
    }

    public getPhaseInstance(state?: PlayerState): StateBase {
        if (!state) state = this.state;
        this.stateMap[state] = this.stateMap[state] ?? PlayerStateFactory(state, this);
        return this.stateMap[state];
    }


    // 增加手牌
    public addCards(cards: Array<PokerCard>) {
        this.cards = this.cards.concat(cards);
    }

    // 过牌
    public roundInPass() {
        this.goto(PlayerState.Wait);
    }

    // 出牌
    public roundInPlay(cards: Array<PokerCard>) {
        // TODO 判断出牌是否合理
        
    }


}