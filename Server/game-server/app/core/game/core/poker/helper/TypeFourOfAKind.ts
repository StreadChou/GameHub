import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeFourOfAKind implements PokerHelper {
    private static _instance: TypeFourOfAKind;

    protected constructor() {
    }

    public static getInstance(): TypeFourOfAKind {
        TypeFourOfAKind._instance = TypeFourOfAKind._instance ?? new TypeFourOfAKind();
        return TypeFourOfAKind._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length != 4) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        return ranks[0] == ranks[ranks.length - 1];
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        const {pokerRankSort} = config
        return pokerRankSort.indexOf(cardsA[0].rank) > pokerRankSort.indexOf(cardsB[0].rank);
    }
}