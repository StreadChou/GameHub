import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType, CardsTypeConfig, FightLordLikeGameOptions} from "../../Interface";

// 对子
export class TypeTreys extends AbstractPokerHelp {
    type: CardsType = CardsType.Treys;

    private static _instance: TypeTreys;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeTreys {
        TypeTreys._instance = TypeTreys._instance ?? new TypeTreys();
        return TypeTreys._instance;
    }


    is(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): boolean {
        if (cards.length != 2) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        return ranks[0] == ranks[1];
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): boolean {
        const {pokerRank} = _opt
        return pokerRank.indexOf(cardsA[0].rank) > pokerRank.indexOf(cardsB[0].rank);
    }


    all(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): Array<Array<PokerCard>> {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const uniqueRank = [...new Set(ranks)]

        let rlt = uniqueRank.map((rank) => {
            const two = this.pokersGetSameRank(cards, rank, null, 2);
            if (!two) return undefined;
            return two;
        })
        return rlt.filter(ele => ele != undefined);
    }
}