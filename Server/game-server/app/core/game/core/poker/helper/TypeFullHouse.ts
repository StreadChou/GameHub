import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeFullHouse implements PokerHelper {
    private static _instance: TypeFullHouse;

    protected constructor() {
    }

    public static getInstance(): TypeFullHouse {
        TypeFullHouse._instance = TypeFullHouse._instance ?? new TypeFullHouse();
        return TypeFullHouse._instance;
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