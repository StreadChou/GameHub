import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeStraight implements PokerHelper {
    private static _instance: TypeStraight;

    protected constructor() {
    }

    public static getInstance(): TypeStraight {
        TypeStraight._instance = TypeStraight._instance ?? new TypeStraight();
        return TypeStraight._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length < 5) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);

        const number = cards.length - 1;
        const start = ranks[0]
        let end = ranks[ranks.length - 1];
        if (end == 1) end = 14
        if (end == 2) end = 15
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