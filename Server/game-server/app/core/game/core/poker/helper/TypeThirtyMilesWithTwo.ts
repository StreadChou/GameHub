import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeThirtyMilesWithTwo implements PokerHelper {
    private static _instance: TypeThirtyMilesWithTwo;

    protected constructor() {
    }

    public static getInstance(): TypeThirtyMilesWithTwo {
        TypeThirtyMilesWithTwo._instance = TypeThirtyMilesWithTwo._instance ?? new TypeThirtyMilesWithTwo();
        return TypeThirtyMilesWithTwo._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        if (cards.length != 5) return false;
        return this.getThirtyRank(cards) !== null;
    }


    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        const {pokerRankSort} = config
        return pokerRankSort.indexOf(this.getThirtyRank(cardsA)) > pokerRankSort.indexOf(this.getThirtyRank(cardsB));
    }

    // 从5张牌里找到三张一样的
    getThirtyRank(cards: Array<PokerCard>): number {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        if (ranks[0] == ranks[2]) return ranks[0];
        if (ranks[1] == ranks[3]) return ranks[1];
        if (ranks[2] == ranks[4]) return ranks[2];
        return null;
    }
}