import {PokerCard} from "../../../core/poker/PokerCard";
import {PokerSuit} from "../../../core/poker/Interface";
import {CardsType, CardsTypeConfig} from "../../Interface";
import {FightLordLikeGameConfig} from "../../core/AbstractFightLordLikeConfig";

export abstract class AbstractPokerHelp {
    abstract type: CardsType;

    // 检查牌型是否是该类型
    abstract is(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean;

    // 检查A 是不是比 B大
    abstract check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean;


    // 从 cards 中 获取所有牌型为 type 的卡牌, 返回的是可以适配的内容
    abstract all(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): Array<Array<PokerCard>> ;


    // 从 cardsA 中获取所有 大于 cardsB 的牌, 其中已知 cardsB 的类型是 type
    // 提醒功能
    allGt(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, type: CardsType, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): Array<Array<PokerCard>> {
        let rlt: Array<Array<PokerCard>> = [];

        // 如果我和B是同类型, 从 cards 中, 取我的所有类型
        if (this.type == type) {
            const cards: Array<Array<PokerCard>> = this.all(cardsA, _config, _opt);
            cards.forEach(ele => {
                if (this.check(ele, cardsB, _config, _opt)) {
                    rlt.push(ele);
                }
            })
        } else {
            if (_config[type].than.includes(this.type)) {
                let res = this.all(cardsA, _config, _opt);
                rlt = rlt.concat(res);
            }
        }

        return rlt;
    }


    // 从卡牌中获取 参数中 大小 或者 花色一样的牌
    pokersGetSameRank(pokers: Array<PokerCard>, rank?: number, suit?: PokerSuit, number?: number): Array<PokerCard> {
        const rlt = pokers.filter(ele => {
            if (rank && ele.rank != rank) return false;
            if (suit && ele.suit != suit) return false;
            //
            return true;
        });
        if (!number) return rlt;
        if (rlt.length < number) return undefined;
        return rlt.splice(0, number);
    }

    // 从卡牌中获取 N 张大小一样的
    pokerGetCardInSame(pokers: Array<PokerCard>, number: number) {
        if (pokers.length < number) return number;
        // 这个排序不需要按照牌的大小排序
        const ranks = pokers.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);

        if (pokers.length == number) {
            if (ranks[0] == ranks[ranks.length - 1]) return ranks[0]
            return null;
        }

        // 如果4张牌找3张一样的牌. 最多找2次 判断 0/2 1/3 是否相等
        // 如果5张牌找2张一样的牌. 最多找4次 判断 0/1 1/2 2/3 3/4 是否相等
        const maxCheck = pokers.length - number + 1

        for (let index in pokers) {
            if (parseInt(index) + 1 > maxCheck) return null;
            if (ranks[index] == ranks[number - 1]) return ranks[index];
        }
    }


    getNextRankFromSort() {

    }

    // sortPoker(cards: Array<PokerCard>, sortRank: Array<number>) {
    //     return cards.sort((cardA, cardB) => {
    //         return sortRank.indexOf(cardsA[0].rank) - pokerRankSort.indexOf(cardsB[0].rank);
    //     })
    // }
    //
    // sortRank(){
    //
    // }
}
