import {TypeSingle} from "./TypeSingle";
import {PokerCard} from "../../../core/poker/PokerCard";
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
import {AbstractPokerHelp} from "./PokerHelper";
import {AbstractPokerConfig} from "../config/PokerConfig";
import {CardsType} from "../../Interface";


const CardsTypeMap: { [key in CardsType]: AbstractPokerHelp } = {
    [CardsType.Single]: TypeSingle.getInstance(),
    [CardsType.Treys]: TypeTreys.getInstance(),
    [CardsType.ThirtyMiles]: TypeThirtyMiles.getInstance(),
    [CardsType.ThirtyMilesWithSingle]: TypeThirtyMilesWithSingle.getInstance(),
    [CardsType.FullHouse]: TypeFullHouse.getInstance(),
    [CardsType.ThirtyMilesWithTwo]: TypeThirtyMilesWithTwo.getInstance(),
    [CardsType.FourOfAKind]: TypeFourOfAKind.getInstance(),
    [CardsType.AllJoker]: TypeAllJoker.getInstance(),
    [CardsType.ContinuousTreys]: TypeContinuousTreys.getInstance(),
    [CardsType.Straight]: TypeStraight.getInstance(),
    [CardsType.StraightFlush]: TypeStraightFlush.getInstance(),
}

export type FactoryUseConfig = { [key in CardsType]?: AbstractPokerConfig }
export type FactoryUseOption = {
    pokerRank: Array<number>;
}


// 判断 cards 是否是 type 类型
export function CardTypeIs(type: CardsType, cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption) {
    const cls = CardsTypeMap[type];
    return cls.is(cards, _config, _opt);
}

// 判断 cardsA 是否 大于 cardsB (根据type)
export function CardTypeCheck(type: CardsType, cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean {
    const cls = CardsTypeMap[type];
    return cls.check(cardsA, cardsB, _config, _opt);
}

// 从 cards 中 获取所有牌型为 type 的卡牌, 返回的是可以适配的内容
// export function getCardsAllType(type: CardsType, cards: Array<PokerCard>, config?: any): Array<Array<PokerCard>> {
//
//     return cls.allGt(type, cards, config);
// }


// 从 cardsA 中获取所有 大于 cardsB 的牌, 其中已知 cardsB 的类型是 type
// 提醒功能
export function CardsAllGt(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, type: CardsType, _config: FactoryUseConfig, _opt: FactoryUseOption): Array<Array<PokerCard>> {
    let rlt: Array<Array<PokerCard>> = [];

    // 从cardsA 中获取所有符合的牌
    const cls = CardsTypeMap[type];
    const cardsInType: Array<Array<PokerCard>> = cls.allGt(cardsA, cardsB, type, _config, _opt);

    return rlt;

}

