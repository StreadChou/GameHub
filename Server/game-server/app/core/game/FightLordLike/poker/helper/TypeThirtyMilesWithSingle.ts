import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType, CardsTypeConfig} from "../../Interface";
import {FightLordLikeGameConfig} from "../../core/AbstractFightLordLikeConfig";

// 三代一
export class TypeThirtyMilesWithSingle extends AbstractPokerHelp{
    type: CardsType = CardsType.ThirtyMilesWithSingle;

    private static _instance: TypeThirtyMilesWithSingle;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeThirtyMilesWithSingle {
        TypeThirtyMilesWithSingle._instance = TypeThirtyMilesWithSingle._instance ?? new TypeThirtyMilesWithSingle();
        return TypeThirtyMilesWithSingle._instance;
    }


    is(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean{
        if (cards.length != 4) return false;
        return this.getThirtyRank(cards) !== null;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean{
        const {pokerRank} = _opt
        return pokerRank.indexOf(this.getThirtyRank(cardsA)) > pokerRank.indexOf(this.getThirtyRank(cardsB));
    }


    all(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): Array<Array<PokerCard>> {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const uniqueRank = [...new Set(ranks)]

        let rlt = uniqueRank.map((rank) => {
            const three = this.pokersGetSameRank(cards, rank, null,3);
            if (!three) return undefined;


            for (let rankOne of uniqueRank) {
                if (rank == rankOne) continue;
                const two = this.pokersGetSameRank(cards, rankOne, null,1);
                if (!two) return undefined;
                return three.concat(two);
            }
        })
        return rlt.filter(ele => ele != undefined);
    }

    // 从5张牌里找到三张一样的
    getThirtyRank(cards: Array<PokerCard>): number {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        if (ranks[0] == ranks[2]) return ranks[0];
        if (ranks[1] == ranks[3]) return ranks[1];
        return null;
    }
}