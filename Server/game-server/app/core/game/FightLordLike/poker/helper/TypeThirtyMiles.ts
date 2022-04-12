import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType} from "../../../runFast/interface";
import {FactoryUseConfig, FactoryUseOption} from "./CardTypeFactory";

// 三张
export class TypeThirtyMiles extends AbstractPokerHelp {
    type: CardsType = CardsType.ThirtyMiles;

    private static _instance: TypeThirtyMiles;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeThirtyMiles {
        TypeThirtyMiles._instance = TypeThirtyMiles._instance ?? new TypeThirtyMiles();
        return TypeThirtyMiles._instance;
    }


    is(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean {
        if (cards.length != 3) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        return ranks[0] == ranks[ranks.length - 1]
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean {
        const {pokerRank} = _opt
        return pokerRank.indexOf(cardsA[0].rank) > pokerRank.indexOf(cardsB[0].rank);
    }

    all(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): Array<Array<PokerCard>> {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const uniqueRank = [...new Set(ranks)]

        let rlt = uniqueRank.map((rank) => {
            const three = this.pokersGetSameRank(cards, rank, null, 3);
            if (!three) return undefined;
            return three;
        })
        return rlt.filter(ele => ele != undefined);
    }
}