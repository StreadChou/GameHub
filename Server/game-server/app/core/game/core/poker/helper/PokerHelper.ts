import {PokerCard} from "../pokerCard";

export interface PokerHelper {
    // 检查牌型是否是该类型
    is(cards: Array<PokerCard>, config?: any): boolean;

    // 检查A 是不是比 B大
    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, config?: any): boolean;


}
