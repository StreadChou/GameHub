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
        return false;
    }


    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        return this.getThirtyRank(cardsA) > this.getThirtyRank(cardsB);
    }

    getThirtyRank(cards: Array<PokerCard>): number {
        const rank = cards.map(ele => ele.rank);
        if (rank[0] == rank[2]) return rank[0];
        if (rank[1] == rank[3]) return rank[1];
        if (rank[2] == rank[4]) return rank[2];
    }
}