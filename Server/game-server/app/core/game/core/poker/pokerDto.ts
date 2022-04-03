import {PokerSuit} from "../../../../constant/poker";

export interface PokerClientDto {
    // 花色
    suit: PokerSuit;
    // 等级
    rank: number;
    // 中文名字
    name: string;
}