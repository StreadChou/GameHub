import {CardsType} from "../../../runFast/interface";
import {TypeSingle} from "./TypeSingle";
import {PokerCard} from "../pokerCard";
import {TypeTreys} from "./TypeTreys";
import {TypeThirtyMilesWithTwo} from "./TypeThirtyMilesWithTwo";
import {TypeFullHouse} from "./TypeFullHouse";
import {TypeThirtyMilesWithSingle} from "./TypeThirtyMilesWithSingle";
import {TypeFourOfAKind} from "./TypeFourOfAKind";
import {TypeThirtyMiles} from "./TypeThirtyMiles";
import {TypeContinuousTreys} from "./TypeContinuousTreys";
import {TypeStraight} from "./TypeStraight";
import {TypeStraightFlush} from "./TypeStraightFlush";
import {TypeAllJoker} from "./TypeAllJoker";


// 两组牌比大小
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
            return TypeThirtyMiles.getInstance().check(cardsA, cardsB, config);

        // 三代一
        case CardsType.ThirtyMilesWithSingle:
            return TypeThirtyMilesWithSingle.getInstance().check(cardsA, cardsB, config);

        // 三代对
        case CardsType.FullHouse:
            return TypeFullHouse.getInstance().check(cardsA, cardsB, config);

        // 三代二
        case CardsType.ThirtyMilesWithTwo:
            return TypeThirtyMilesWithTwo.getInstance().check(cardsA, cardsB, config);

        // 四张(炸弹)
        case CardsType.FourOfAKind:
            return TypeFourOfAKind.getInstance().check(cardsA, cardsB, config);

        // 王炸
        case CardsType.AllJoker:
            return TypeAllJoker.getInstance().check(cardsA, cardsB, config);

        // 连对
        case CardsType.ContinuousTreys:
            return TypeContinuousTreys.getInstance().check(cardsA, cardsB, config);

        // 顺子
        case CardsType.Straight:
            return TypeStraight.getInstance().check(cardsA, cardsB, config);

        // 同花顺
        case CardsType.StraightFlush:
            return TypeStraightFlush.getInstance().check(cardsA, cardsB, config);


        default:
            return false;
    }
}

// 检查一组牌的是否符合
export function CardTypeIs(type: CardsType, cards: Array<PokerCard>, config?: any) {
    switch (type) {
        // 单张
        case CardsType.Single:
            return TypeSingle.getInstance().is(cards, config);

        // 对子
        case CardsType.Treys:
            return TypeTreys.getInstance().is(cards, config);

        // 三张
        case CardsType.ThirtyMiles:
            return TypeThirtyMiles.getInstance().is(cards, config);

        // 三代一
        case CardsType.ThirtyMilesWithSingle:
            return TypeThirtyMilesWithSingle.getInstance().is(cards, config);

        // 三代对子
        case CardsType.FullHouse:
            return TypeFullHouse.getInstance().is(cards, config);

        // 三代二
        case CardsType.ThirtyMilesWithTwo:
            return TypeThirtyMilesWithTwo.getInstance().is(cards, config);

        // 四张
        case CardsType.FourOfAKind:
            return TypeFourOfAKind.getInstance().is(cards, config);

        // 王炸
        case CardsType.AllJoker:
            return TypeAllJoker.getInstance().is(cards, config);

        // 连对
        case CardsType.ContinuousTreys:
            return TypeContinuousTreys.getInstance().is(cards, config);

        // 顺子
        case CardsType.Straight:
            return TypeStraight.getInstance().is(cards, config);

        // 同花顺
        case CardsType.StraightFlush:
            return TypeStraightFlush.getInstance().is(cards, config);

        default:
            return false;
    }
}