import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {ConfigStraight} from "../config/ConfigStraight";
import {CardsType, CardsTypeConfig} from "../../Interface";
import {FightLordLikeGameConfig} from "../../core/AbstractFightLordLikeConfig";

// 同花顺
export class TypeStraightFlush extends AbstractPokerHelp {
    type: CardsType = CardsType.StraightFlush;

    private static _instance: TypeStraightFlush;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeStraightFlush {
        TypeStraightFlush._instance = TypeStraightFlush._instance ?? new TypeStraightFlush();
        return TypeStraightFlush._instance;
    }


    is(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean {
        if (cards.length <= 5) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const suits = cards.map(ele => ele.suit);
        const allSuit = suits.every(ele => ele == suits[0]);
        if (!allSuit) return false;


        const number = cards.length - 1;
        const start = ranks[0]
        const end = ranks[ranks.length - 1];
        if (start + number != end) return false

        //
        return true;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): boolean {
        const rankA = cardsA.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const rankB = cardsB.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const {pokerRank} = _opt
        return pokerRank.indexOf(rankA[rankA.length - 1]) > pokerRank.indexOf(rankB[rankB.length - 1]);
    }


    all(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: FightLordLikeGameConfig): Array<Array<PokerCard>> {
        const config = _config[this.type] as ConfigStraight;
        let rlt: Array<Array<PokerCard>> = [];
        const {pokerRank} = _opt

        // 要取每个长度
        for (let length = config.minLength; length <= config.maxLength; length++) {
            let res = cards.map((card) => {
                let suitable: Array<PokerCard> = [];

                for (let index = 0; index < length; length++) {
                    let thisRank = pokerRank[pokerRank.indexOf(card.rank) + index]
                    const temp = this.pokersGetSameRank(cards, thisRank, card.suit, 1);
                    if (!temp) return undefined;
                    suitable = suitable.concat(temp);
                }

                return suitable;
            })

            rlt = rlt.concat(res);
        }

        return rlt.filter(ele => ele != undefined);
    }
}