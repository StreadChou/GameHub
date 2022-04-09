import {CardsType} from "../../../runFast/interface";
import {TypeSingle} from "./TypeSingle";
import {PokerCard} from "../pokerCard";
import {TypeTreys} from "./TypeTreys";
import {TypeThirtyMilesWithTwo} from "./TypeThirtyMilesWithTwo";
import {TypeFullHouse} from "./TypeFullHouse";
import {TypeThirtyMilesWithSingle} from "./TypeThirtyMilesWithSingle";
import {TypeFourOfAKind} from "./TypeFourOfAKind";

export function CardTypeCheck(type: CardsType, cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any) {
    switch (type) {
        // 单张
        case CardsType.Single:
            return TypeSingle.getInstance().check(cardsA, cardsB, config);

        // 对子
        case CardsType.Treys:
            return TypeTreys.getInstance().check(cardsA, cardsB, config);

        // 三张
        case CardsType.ThirtyMiles:
            return TypeTreys.getInstance().check(cardsA, cardsB, config);

        // 三代一
        case CardsType.ThirtyMilesWithSingle:
            return TypeThirtyMilesWithSingle.getInstance().check(cardsA, cardsB, config);

        // 三代对
        case CardsType.FullHouse:
            return TypeFullHouse.getInstance().check(cardsA, cardsB, config);

        // 三代二
        case CardsType.ThirtyMilesWithTwo:
            return TypeThirtyMilesWithTwo.getInstance().check(cardsA, cardsB, config);

        // 四张一张
        case CardsType.FourOfAKind:
            return TypeFourOfAKind.getInstance().check(cardsA, cardsB, config);

        default:
            return false;
    }
}