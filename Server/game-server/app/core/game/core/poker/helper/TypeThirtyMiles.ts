import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";
import {CardsType} from "../../../runFast/interface";

export class TypeThirtyMiles implements PokerHelper {
    private static _instance: TypeThirtyMiles;

    protected constructor() {
    }

    public static getInstance(): TypeThirtyMiles {
        TypeThirtyMiles._instance = TypeThirtyMiles._instance ?? new TypeThirtyMiles();
        return TypeThirtyMiles._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length != 3) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        return ranks[0] == ranks[ranks.length - 1]
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        const {pokerRankSort} = config
        return pokerRankSort.indexOf(cardsA[0].rank) > pokerRankSort.indexOf(cardsB[0].rank);
    }
}