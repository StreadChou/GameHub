export enum GameEnum {
    RunFast = 1, // 跑得快
}

// 游戏类型
export enum GameTypeEnum {
    FightLordLike = 1, // 和斗地主很像额游戏类型
}


// 房费谁来付
export enum FeePayFor {
    Master = 1,
    Players,
}


// 创建游戏的设置
export interface AbstractRoomOption {
    maxPlayer: number;
    gameEnum: GameEnum
    gameTypeEnum: GameTypeEnum,
    whoPay: FeePayFor,
    chat: boolean,
}

export enum RunFastConfig {
    FourWithThree = 1, // 四代三
    Spade3First, // 黑桃三先出牌
    MustPlay, // 有牌必须出
    ThreeAceBoom, // 三个 A 算炸弹
    ShowCardsNumber, // 显示卡牌数量
    Heart10Bird, // 红桃10抓鸟
}

export interface RunFastRoomOptions extends AbstractRoomOption {
    pokerNumber: number,
    dealPoker: number, // 单次发牌
    double: boolean;
    addPoints: boolean;
    config: { [key in RunFastConfig]: boolean }
}