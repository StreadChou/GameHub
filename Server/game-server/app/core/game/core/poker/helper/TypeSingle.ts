import {PokerHelper} from "./PokerHelper";
import {PokerCard} from "../pokerCard";
import {CardsType} from "../../../runFast/interface";

export class TypeSingle implements PokerHelper {
    private static _instance: TypeSingle;

    protected constructor() {
    }

    public static getInstance(): TypeSingle {
        TypeSingle._instance = TypeSingle._instance ?? new TypeSingle();
        return TypeSingle._instance;
    }


    is(cards: Array<PokerCard>, config?: any): boolean {
        return cards.length == 1;

    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean {
        const {pokerRankSort} = config
        return pokerRankSort.indexOf(cardsA[0].rank) > pokerRankSort.indexOf(cardsB[0].rank);
    }
}