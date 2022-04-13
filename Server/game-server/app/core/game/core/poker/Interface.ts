export enum PokerSuit {
    CLUB = 1, // 梅花
    DIAMOND, // 方块(钻石)
    HEART, // 红心(红桃)
    SPADE, // 黑桃
    JOKER, // 小丑(王牌)
    ADVERT, // 广告牌
}

// 和客户端沟通用的扑克结构体
export interface PokerClientDto {
    suit: PokerSuit // 扑克的花色
    rank: number // 扑克的大小
    value?: number // 扑克的唯一value值
    name?: string // 扑克的中文名字
}