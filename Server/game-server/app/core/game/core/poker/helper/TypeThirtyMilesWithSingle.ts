import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeThirtyMilesWithSingle implements PokerHelper {
    private static _instance: TypeThirtyMilesWithSingle;

    protected constructor() {
    }

    public static getInstance(): TypeThirtyMilesWithSingle {
        TypeThirtyMilesWithSingle._instance = TypeThirtyMilesWithSingle._instance ?? new TypeThirtyMilesWithSingle();
        return TypeThirtyMilesWithSingle._instance;
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
    }
}