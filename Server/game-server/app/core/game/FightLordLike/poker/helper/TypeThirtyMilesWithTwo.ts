import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType, CardsTypeConfig} from "../../Interface";
import {FightLordLikeGameConfig} from "../../core/AbstractFightLordLikeConfig";

// 三代二
export class TypeThirtyMilesWithTwo extends AbstractPokerHelp {
    type: CardsType = CardsType.ThirtyMilesWithTwo;

    private static _instance: TypeThirtyMilesWithTwo;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeThirtyMilesWithTwo {
        TypeThirtyMilesWithTwo._instance = TypeThirtyMilesWithTwo._instance ?? new TypeThirtyMilesWithTwo();
        return TypeThirtyMilesWithTwo._instance;
    }


    is(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean {
        if (cards.length != 5) return false;
        return this.getThirtyRank(cards) !== null;
    }


    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean {
        const {pokerRank} = _opt
        return pokerRank.indexOf(this.getThirtyRank(cardsA)) > pokerRank.indexOf(this.getThirtyRank(cardsB));
    }


    all(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): Array<Array<PokerCard>> {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const uniqueRank = [...new Set(ranks)]

        let rlt = uniqueRank.map((rank) => {
            let three = this.pokersGetSameRank(cards, rank, null, 3);
            if (!three) return undefined;

            for (let card of cards) {
                if (three.length >= 5) break;
                if (card.rank == rank) continue;
                three = three.concat(card);
            }
        })
        return rlt.filter(ele => ele != undefined);
    }

    // 从5张牌里找到三张一样的
    getThirtyRank(cards: Array<PokerCard>): number {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        if (ranks[0] == ranks[2]) return ranks[0];
        if (ranks[1] == ranks[3]) return ranks[1];
        if (ranks[2] == ranks[4]) return ranks[2];
        return null;
    }
}