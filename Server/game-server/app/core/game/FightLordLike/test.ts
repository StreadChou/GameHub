import {PokerCard} from "../core/poker/PokerCard";
import {CardsType, FightLordLikeGameOptions} from "./Interface";
import {ConfigStraight} from "./poker/config/ConfigStraight";
import {CardsAllGt, CardTypeCheck, CardTypeIs} from "./poker/helper/CardTypeFactory";
import {TypeSingle} from "./poker/helper/TypeSingle";
import {TypeTreys} from "./poker/helper/TypeTreys";
import {TypeThirtyMiles} from "./poker/helper/TypeThirtyMiles";
import {TypeThirtyMilesWithSingle} from "./poker/helper/TypeThirtyMilesWithSingle";
import {TypeFullHouse} from "./poker/helper/TypeFullHouse";
import {TypeThirtyMilesWithTwo} from "./poker/helper/TypeThirtyMilesWithTwo";
import {TypeFourOfAKind} from "./poker/helper/TypeFourOfAKind";
import {TypeAllJoker} from "./poker/helper/TypeAllJoker";
import {TypeContinuousTreys} from "./poker/helper/TypeContinuousTreys";
import {TypeStraight} from "./poker/helper/TypeStraight";
import {TypeStraightFlush} from "./poker/helper/TypeStraightFlush";
import {AbstractPokerHelp} from "./poker/helper/PokerHelper";
import {ConfigContinuousTreys} from "./poker/config/ConfigContinuousTreys";
import {ConfigSingle} from "./poker/config/ConfigSingle";
import {ConfigTreys} from "./poker/config/ConfigTreys";
import {ConfigThirtyMiles} from "./poker/config/ConfigThirtyMiles";
import {ConfigThirtyMilesWithSingle} from "./poker/config/ConfigThirtyMilesWithSingle";
import {ConfigFullHouse} from "./poker/config/ConfigFullHouse";
import {ConfigThirtyMilesWithTwo} from "./poker/config/ConfigThirtyMilesWithTwo";
import {ConfigFourOfAKind} from "./poker/config/ConfigFourOfAKind";
import {ConfigAllJoker} from "./poker/config/ConfigAllJoker";
import {ConfigStraightFlush} from "./poker/config/ConfigStraightFlush";

const allowCardsType = [
    CardsType.Single,
    CardsType.Treys,
    CardsType.ThirtyMiles,
    CardsType.ThirtyMilesWithSingle,
    CardsType.ThirtyMilesWithTwo,
    CardsType.ContinuousTreys,
    CardsType.Straight,
    CardsType.FourOfAKind,
]


const cardsTypeConfig: { [key in CardsType]: any } = {
    [CardsType.Straight]: new ConfigStraight(5, 13),
    [CardsType.ContinuousTreys]: new ConfigContinuousTreys(5, 13),

    [CardsType.Single]: new ConfigSingle(),
    [CardsType.Treys]: new ConfigTreys(),
    [CardsType.ThirtyMiles]: new ConfigThirtyMiles(),
    [CardsType.ThirtyMilesWithSingle]: new ConfigThirtyMilesWithSingle(),
    [CardsType.FullHouse]: new ConfigFullHouse(),
    [CardsType.ThirtyMilesWithTwo]: new ConfigThirtyMilesWithTwo(),
    [CardsType.FourOfAKind]: new ConfigFourOfAKind(),
    [CardsType.AllJoker]: new ConfigAllJoker(),
    [CardsType.StraightFlush]: new ConfigStraightFlush(),
}


const gameOption: FightLordLikeGameOptions = {
    gameEnum: 1,
    gameTypeEnum: 1,
    allowCardsType: [
        CardsType.Single,
        CardsType.Treys, CardsType.ContinuousTreys,
        CardsType.ThirtyMiles, CardsType.ThirtyMilesWithSingle, CardsType.ThirtyMilesWithTwo,
        CardsType.Straight, CardsType.FourOfAKind,
    ],
    pokerRank: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2],
    maxPlayer: 1,
    roundTime: 1,
    perPlayerCards: 1,
}


export enum Type {
    Single = 1, // 单张
    Treys, // 对子
    ThirtyMiles, // 三张
    ThirtyMilesWithSingle, // 三代一
    FullHouse, // 三代对
    ThirtyMilesWithTwo, // 三代两个(不管是不是对子)
    ContinuousTreys, // 连对
    Straight,// 顺子
    StraightFlush,// 同花顺
    FourOfAKind, // 四张相同的牌(炸弹)
    AllJoker, // 全部都是小丑(王炸)
}

export enum SUIT {
    CLUB = 1, // 梅花
    DIAMOND, // 方块(钻石)
    HEART, // 红心(红桃)
    SPADE, // 黑桃
    JOKER, // 小丑(王牌)
    ADVERT, // 广告牌
}

// 代码从这里开始

// console.log("检查A是不是某种牌型")
// const cardsA = [
//     new PokerCard(1, 1),
//     new PokerCard(1, 2),
//     new PokerCard(2, 1),
// ]
// console.log(CardTypeIs(2, cardsA, cardsTypeConfig, gameOption));


// console.log("检查是不是B 是不是比 C 大, 同一种类型")
// const cardsC = [
//     new PokerCard(1, 1),
//     new PokerCard(2, 1),
// ]
// const cardsB = [
//     new PokerCard(1, 2),
//     new PokerCard(1, 2),
// ]
// console.log(CardTypeCheck(2, cardsB, cardsC, cardsTypeConfig, gameOption));


console.log("检查D里有没有牌大于E(有牌可出)")
const cardsE = [
    new PokerCard(1, 5),
    new PokerCard(1, 5),
    new PokerCard(1, 5),
    new PokerCard(1, 3),
    new PokerCard(1, 3),
]

const cardsD = [
    new PokerCard(1, 6),
    new PokerCard(1, 6),
    new PokerCard(1, 6),
    new PokerCard(1, 6),
    new PokerCard(1, 5),
    new PokerCard(1, 5),
    new PokerCard(1, 4),
    new PokerCard(1, 4),
]
console.log(CardsAllGt(cardsD, cardsE, 5, cardsTypeConfig, gameOption));

