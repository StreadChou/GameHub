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
import {CardsType, CardsTypeConfig, FightLordLikeGameOptions} from "../../Interface";


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


// 判断 cards 是否是 type 类型
export function CardTypeIs(type: CardsType, cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions) {
    const cls = CardsTypeMap[type];
    return cls.is(cards, _config, _opt);
}

// 判断 cardsA 是否 大于 cardsB (根据type)
export function CardTypeCheck(type: CardsType, cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): boolean {
    const cls = CardsTypeMap[type];
    return cls.check(cardsA, cardsB, _config, _opt);
}


// 从 cardsA 中获取所有 大于 cardsB 的牌, 其中已知 cardsB 的类型是 type
// 提醒功能
export function CardsAllGt(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, type: CardsType, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): Array<Array<PokerCard>> {
    let rlt: Array<Array<PokerCard>> = [];

    // 从cardsA 中获取所有符合的牌
    const cls = CardsTypeMap[type];
    const cardsInType: Array<Array<PokerCard>> = cls.allGt(cardsA, cardsB, type, _config, _opt);
    rlt = rlt.concat(cardsInType);


    // 检查比他大的
    const bConfig = _config[type];
    if (!bConfig || !bConfig.than || bConfig.than.length <= 0) return rlt;
    for (let thanTyp of bConfig.than) {
        const clsThan = CardsTypeMap[thanTyp];
        const res = clsThan.all(cardsA, _config, _opt);
        rlt = rlt.concat(res);
    }

    return rlt;

}

