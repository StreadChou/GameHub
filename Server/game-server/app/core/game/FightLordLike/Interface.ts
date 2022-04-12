
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
