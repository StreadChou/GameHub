import {AbstractPlayer} from "../../core/abstract/abstractPlayer";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {randomNumberBetween} from "../../../../helper/randomHelper";
import {PokerCard} from "../../core/poker/PokerCard";
import {EventEmitter} from "events";
import {PlayerEvent} from "../constant/event";
import {Game} from "./game";

export class Player extends AbstractPlayer {
    game: Game;
    private event: EventEmitter = new EventEmitter().setMaxListeners(50);
    remainCardsMap: { [key in number]: PokerCard } = {}; // 我的手牌

    cardsList(): Array<PokerCard> {
        return Object.values(this.remainCardsMap);
    }

    get cardNumber(): number {
        return Object.values(this.remainCardsMap).length;
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


    addCards(cards: Array<PokerCard>) {
        cards.forEach(ele => {
            this.remainCardsMap[ele.value] = ele;
        })
    }

    getCards(_cardsValue: any[], isAuto = false): Array<PokerCard> {
        const cards = Object.keys(this.remainCardsMap);
        const rlt: Array<PokerCard> = [];
        if (isAuto && _cardsValue.length <= 0) {
            const random = cards[randomNumberBetween(0, cards.length - 1)];
            rlt.push(this.remainCardsMap[random]);
            return rlt;
        }
        _cardsValue.forEach(ele => {
            rlt.push(this.remainCardsMap[ele.value]);
        })
        return rlt;
    }
}