import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeContinuousTreys implements PokerHelper {
    private static _instance: TypeContinuousTreys;

    protected constructor() {
    }

    public static getInstance(): TypeContinuousTreys {
        TypeContinuousTreys._instance = TypeContinuousTreys._instance ?? new TypeContinuousTreys();
        return TypeContinuousTreys._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length % 2 != 0 || cards.length <= 3) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);

        const number = (cards.length / 2) - 1;
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