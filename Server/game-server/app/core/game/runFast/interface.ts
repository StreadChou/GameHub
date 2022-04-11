import {PokerClientDto} from "../core/poker/pokerDto";
import {ITransitionDir} from "../../../helper/stateMachine";

// 创建游戏需要的opts
export interface CreateGameOpts {
    maxPlayer: number,
    config: GameConfig;
}

// 房间配置信息
export interface GameConfig {
    roundTime: number;
    perPlayerCards: number;
    config: {}
    pokerConfig?: {
        cardsType: Array<CardsType>
        CardsTypeConfig: { [key in CardsType]?: any }
        pokerRankSort: Array<number>
    }
}

// 牌面类型
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

export type GameConfigKey = keyof GameConfig;


export interface GameFsmInterface {
    next: Array<ITransitionDir<GameState>>,
}

export enum GameState {
    Init,
    Start,
    Deal,
    Round,
    GameOver,
}

// 玩家状态
export enum PlayerState {
    Wait = 100,
    Round
}


// 给客户端发的牌的信息
export interface OnReceivedPokerMessage {
    uid: string
    number: number
    cards?: Array<PokerClientDto>
}


export interface OnPhaseMessage {
    phase: GameState
    time: number
}