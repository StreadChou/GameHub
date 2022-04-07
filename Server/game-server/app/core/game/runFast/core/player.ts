import {AbstractPlayer} from "../../abstract/abstractPlayer";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {randomNumberBetween} from "../../../../helper/randomHelper";
import {PokerCard} from "../../core/poker/pokerCard";
import {EventEmitter} from "events";
import {PlayerEvent} from "../constant/event";
import {Game} from "./game";

export class Player extends AbstractPlayer {
    game: Game;
    private event: EventEmitter = new EventEmitter().setMaxListeners(50);
    // 我的手牌
    cards: PokerCard[] = [];
    round: boolean = false; // 是否是我的回合

    get cardNumber(): number {
        return this.cards.length;
    }


    protected constructor(game: Game, roomPlayer: RoomPlayer) {
        super(roomPlayer);
        this.game = game;
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


    // 增加手牌
    public addCards(cards: Array<PokerCard>) {
        this.cards = this.cards.concat(cards);
    }

    // 判断玩家是有这些牌
    getCards(_cards: { suit: number, rank: number }[]): PokerCard[] {
        return [];
    }


}