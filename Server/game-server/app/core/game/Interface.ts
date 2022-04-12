import {CardsType} from "./core/poker/Interface";

// 所有游戏
export enum GameEnum {
    RunFast = 1, // 跑得快
}

// 游戏类型
export enum GameTypeEnum {
    FightLordLike = 1, // 和斗地主很像额游戏类型
}


export interface FightLordLikePokerConfig {
    // 允许的卡牌类型
    allowCardsType: Array<CardsType>
    // 卡牌的配置
    cardsTypeConfig: { [key in CardsType]?: any }
    // 卡牌的排序
    pokerRankSort: Array<number>
}


// 创建游戏需要的配置
export interface CreateGameDto<T> {
    maxPlayer: number,
    pokerConfig: T;
}