import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeTreys implements PokerHelper {
    private static _instance: TypeTreys;

    protected constructor() {
    }

    public static getInstance(): TypeTreys {
        TypeTreys._instance = TypeTreys._instance ?? new TypeTreys();
        return TypeTreys._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length != 2) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        return ranks[0] == ranks[1];
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        const {pokerRankSort} = config
        return pokerRankSort.indexOf(cardsA[0].rank) > pokerRankSort.indexOf(cardsB[0].rank);
    }
}