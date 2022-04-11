import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeStraightFlush implements PokerHelper {
    private static _instance: TypeStraightFlush;

    protected constructor() {
    }

    public static getInstance(): TypeStraightFlush {
        TypeStraightFlush._instance = TypeStraightFlush._instance ?? new TypeStraightFlush();
        return TypeStraightFlush._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length <= 5) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const suits = cards.map(ele => ele.suit);
        const allSuit = suits.every(ele => ele == suits[0]);
        if (!allSuit) return false;


        const number = cards.length - 1;
        const start = ranks[0]
        const end = ranks[ranks.length - 1];
        if (start + number != end) return false

        //
        return true;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        const rankA = cardsA.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const rankB = cardsB.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const {pokerRankSort} = config
        return pokerRankSort.indexOf(rankA[rankA.length - 1]) > pokerRankSort.indexOf(rankB[rankB.length - 1]);
    }
}