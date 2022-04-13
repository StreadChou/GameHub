// 牌面类型
import {AbstractPokerConfig} from "./poker/config/PokerConfig";
import {GameOptions} from "../Interface";

export enum CardsType {
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


export type CardsTypeConfig = { [key in CardsType]?: AbstractPokerConfig }


export interface FightLordLikeGameOptions extends GameOptions {
    roundTime: number;
    perPlayerCards: number;
    pokerRank?: Array<number>; // 这个参数将会在游戏中补全
    allowCardsType?: Array<CardsType>; // 这个参数将会在游戏中补全
}


export enum GameEvent {
    OnGameStart = "onGameStart"
}

export enum PlayerEvent {
    OnReceive = "onReceive"
}