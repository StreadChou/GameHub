import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";

export class TypeThirtyMiles implements PokerHelper {
    private static _instance: TypeThirtyMiles;

    protected constructor() {
    }

    public static getInstance(): TypeThirtyMiles {
        TypeThirtyMiles._instance = TypeThirtyMiles._instance ?? new TypeThirtyMiles();
        return TypeThirtyMiles._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        return false;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        return true;
    }
}