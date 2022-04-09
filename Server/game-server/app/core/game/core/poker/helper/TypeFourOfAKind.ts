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
        return false;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        return cardsA[0].rank > cardsB[0].rank;
    }
}