import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType, CardsTypeConfig, FightLordLikeGameOptions} from "../../Interface";

// 四张(炸弹)
export class TypeFourOfAKind extends AbstractPokerHelp {
    type: CardsType = CardsType.FourOfAKind;

    private static _instance: TypeFourOfAKind;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeFourOfAKind {
        TypeFourOfAKind._instance = TypeFourOfAKind._instance ?? new TypeFourOfAKind();
        return TypeFourOfAKind._instance;
    }


    is(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): boolean{
        if (cards.length != 4) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        return ranks[0] == ranks[ranks.length - 1];
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): boolean{
        const {pokerRank} = _opt
        return pokerRank.indexOf(cardsA[0].rank) > pokerRank.indexOf(cardsB[0].rank);
    }


    all(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameOptions): Array<Array<PokerCard>> {
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const rlt = [...new Set(ranks)].map((rank) => {
            const res = this.pokersGetSameRank(cards, rank, null,4);
            if (!res) return undefined;
            return res;
        })
        return rlt.filter(ele => ele != undefined);
    }
}