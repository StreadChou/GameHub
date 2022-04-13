
// 所有游戏
import {CardsType} from "./FightLordLike/Interface";

export enum GameEnum {
    RunFast = 1, // 跑得快
}

// 游戏类型
export enum GameTypeEnum {
    FightLordLike = 1, // 和斗地主很像额游戏类型
}

export interface GameOptions {
    gameEnum: GameEnum
    gameTypeEnum: GameTypeEnum,

    maxPlayer: number,
}