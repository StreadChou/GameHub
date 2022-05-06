export enum GameEnum {
    RunFast = 1, // 跑得快
}

// 游戏类型
export enum GameTypeEnum {
    FightLordLike = 1, // 和斗地主很像额游戏类型
}



// 创建游戏的设置
export interface AbstractRoomOption {
    maxPlayer: number;
    gameEnum: GameEnum
    gameTypeEnum: GameTypeEnum,
    whoPay: 'master' |  'all' | 'winner',
    chat: boolean,
}

export enum RunFastConfig {
    FourWithThree = 'fourWithThree', // 四代三
    Spade3First = 'spade3First', // 黑桃三先出牌
    MustPlay = 'mustPlay', // 有牌必须出
    ThreeAceBoom = 'threeAceBoom', // 三个 A 算炸弹
    ShowCardsNumber = 'showCardsNumber', // 显示卡牌数量
}

export interface RunFastRoomOptions extends AbstractRoomOption {
    pokerNumber: number,
    dealPoker: number, // 单次发牌
    double: boolean;
    addPoints: boolean;
    config: { [key in RunFastConfig]: boolean }
}