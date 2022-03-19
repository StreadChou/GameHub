// 一副牌
import {PokerCard} from "./pokerCard";

export class PokerManager {
    withJoker: boolean = true; // 是否包含小丑牌
    withAdvert: boolean = false; // 是否包含广告牌

    cards: PokerCard[] = [];

    constructor() {

    }


}