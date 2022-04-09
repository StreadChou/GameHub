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
        return false;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        return cardsA[0].rank > cardsB[0].rank;
    }
}