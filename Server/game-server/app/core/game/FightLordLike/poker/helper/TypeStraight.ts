import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType} from "../../../runFast/interface";
import {GameType} from "../../../GameFactory";
import {AbstractPokerConfig} from "../config/PokerConfig";
import {ConfigContinuousTreys} from "../config/ConfigContinuousTreys";
import {ConfigStraight} from "../config/ConfigStraight";
import {FactoryUseConfig, FactoryUseOption} from "./CardTypeFactory";

// 顺子
export class TypeStraight extends AbstractPokerHelp{
    type: CardsType;

    private static _instance: TypeStraight;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeStraight {
        TypeStraight._instance = TypeStraight._instance ?? new TypeStraight();
        return TypeStraight._instance;
    }


    is(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean{
        if (cards.length < 5) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);

        const number = cards.length - 1;
        const start = ranks[0]
        let end = ranks[ranks.length - 1];
        if (end == 1) end = 14
        if (end == 2) end = 15
        if (start + number != end) return false

        //
        return true;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean{
        const rankA = cardsA.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const rankB = cardsB.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const {pokerRank} = _opt
        return pokerRank.indexOf(rankA[rankA.length - 1]) > pokerRank.indexOf(rankB[rankB.length - 1]);
    }


    all(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): Array<Array<PokerCard>> {
        const config = _config[this.type] as ConfigStraight;
        let rlt: Array<Array<PokerCard>> = [];
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const {pokerRank} = _opt

        // 要取每个长度
        for (let length = config.minLength; length <= config.maxLength; length++) {

            let res = [...new Set(ranks)].map((rank) => {
                let suitable: Array<PokerCard> = [];

                for (let index = 0; index < length; length++) {
                    let thisRank = pokerRank[pokerRank.indexOf(rank) + index]
                    const temp = this.pokersGetSameRank(cards, thisRank, null,1);
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