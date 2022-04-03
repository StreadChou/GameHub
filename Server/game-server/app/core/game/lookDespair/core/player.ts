import {AbstractPlayer} from "../../abstract/abstractPlayer";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {randomNumberBetween} from "../../../../helper/randomHelper";
import {PokerCard} from "../../core/poker/pokerCard";

export class Player extends AbstractPlayer {
    // 先手掷骰子
    firstHandRandom: number = 0;
    // 手牌
    cards: PokerCard[] = [];

    get cardNumber(): number {
        return this.cards.length;
    }

    protected constructor(roomPlayer: RoomPlayer) {
        super(roomPlayer);
        this.firstHandRandom = randomNumberBetween(1, 6);
    }

    static generate(roomPlayer: RoomPlayer): Player {
        return new Player(roomPlayer);
    }

    public addCards(cards: PokerCard[]) {
        this.cards = this.cards.concat(cards);
    }
}