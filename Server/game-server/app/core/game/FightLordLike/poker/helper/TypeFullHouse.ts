import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType} from "../../../runFast/interface";
import {FactoryUseConfig, FactoryUseOption} from "./CardTypeFactory";


// 三代对
export class TypeFullHouse extends AbstractPokerHelp {
    type: CardsType = CardsType.FullHouse;

    private static _instance: TypeFullHouse;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeFullHouse {
        TypeFullHouse._instance = TypeFullHouse._instance ?? new TypeFullHouse();
        return TypeFullHouse._instance;
    }


    is(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean {
        if (cards.length != 5) return false;
        const sameRank = this.pokerGetCardInSame(cards, 3);
        const otherRank = cards.map(card => {
            if (card.rank != sameRank) return card.rank;
        })
        return otherRank[0] != otherRank[1]
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean {
        const {pokerRank} = _opt
        const sameRankA = this.pokerGetCardInSame(cardsA, 3);
        const sameRankB = this.pokerGetCardInSame(cardsB, 3);

        return pokerRank.indexOf(sameRankA) > pokerRank.indexOf(sameRankB);
    }


    all(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): Array<Array<PokerCard>> {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const uniqueRank = [...new Set(ranks)]

        let rlt = uniqueRank.map((rank) => {
            const three = this.pokersGetSameRank(cards, rank, null, 3);
            if (!three) return undefined;


            for (let rankTwo of uniqueRank) {
                if (rank == rankTwo) continue;
                const two = this.pokersGetSameRank(cards, rankTwo, null, 2);
                if (!two) return undefined;
                return three.concat(two);
            }
        })
        return rlt.filter(ele => ele != undefined);
    }
}