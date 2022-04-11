import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";
import {PokerSuit} from "../../../../../constant/poker";

export class TypeAllJoker implements PokerHelper {
    private static _instance: TypeAllJoker;

    protected constructor() {
    }

    public static getInstance(): TypeAllJoker {
        TypeAllJoker._instance = TypeAllJoker._instance ?? new TypeAllJoker();
        return TypeAllJoker._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length < 2) return false;
        const suits = cards.map(ele => ele.suit);
        const allSuit = suits.every(ele => ele == PokerSuit.JOKER);
        if (!allSuit) return false;
        //
        return true;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        return false;
    }
}