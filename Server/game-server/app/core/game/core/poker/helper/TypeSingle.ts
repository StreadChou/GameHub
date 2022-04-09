import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeSingle implements PokerHelper {
    private static _instance: TypeSingle;

    protected constructor() {
    }

    public static getInstance(): TypeSingle {
        TypeSingle._instance = TypeSingle._instance ?? new TypeSingle();
        return TypeSingle._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        return false;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        return cardsA[0].rank > cardsB[0].rank;
    }
}