import {PokerCard} from "./PokerCard";
import {PokerSuit} from "./Interface";

export class PokerManager {
    cards: PokerCard[] = [];

    public constructor(config: { [key in PokerSuit]?: Array<number> }) {
        for (let _suit in config) {
            const suit: PokerSuit = parseInt(_suit);
            const cards: Array<number> = config[suit];
            cards.forEach(rank => {
                this.cards.push(new PokerCard(suit, rank))
            })
        }
    }

    /**
     * 获取牌的 config 用于生成牌
     * @param number 几副牌
     */
    static getPokerConfig(number: number = 1): { [key in PokerSuit]?: Array<number> } {
        const config: { [key in PokerSuit]?: Array<number> } = {}
        config[PokerSuit.ADVERT] = [];
        config[PokerSuit.JOKER] = [];
        config[PokerSuit.SPADE] = [];
        config[PokerSuit.HEART] = [];
        config[PokerSuit.DIAMOND] = [];
        config[PokerSuit.CLUB] = [];
        for (let i = 1; i <= number; i++) {
            config[PokerSuit.JOKER] = [1, 2];
            config[PokerSuit.SPADE] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            config[PokerSuit.HEART] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            config[PokerSuit.DIAMOND] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            config[PokerSuit.CLUB] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        return config;
    }

    static makeClient(pokers: Array<PokerCard>): Array<any> {
        return pokers.map(ele => {
            return ele.makeClient();
        })
    }

    /**
     * 排除某种牌
     * @param number 数量
     * @param rank 大小
     * @param suit 花色
     */
    excludeCardsRank(rank?: number, suit?: PokerSuit, number: number = 1) {
        // 分析实际业务, 可能会遍历大多数. 所以不使用for in的方式(for in 删除会还需要对数组 undefined 取出)
        this.cards = this.cards.filter(card => {
            if (number <= 0) return true;

            if (rank && card.rank != rank) return true
            if (suit && card.suit != suit) return true

            number--;
            return false;
        })
    }

}