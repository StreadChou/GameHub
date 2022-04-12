import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {ConfigContinuousTreys} from "../config/ConfigContinuousTreys";
import {CardsType, CardsTypeConfig, GameOptions} from "../../Interface";

// 连对
export class TypeContinuousTreys extends AbstractPokerHelp {
    type: CardsType = CardsType.ContinuousTreys;
    private static _instance: TypeContinuousTreys;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeContinuousTreys {
        TypeContinuousTreys._instance = TypeContinuousTreys._instance ?? new TypeContinuousTreys();
        return TypeContinuousTreys._instance;
    }


    is(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: GameOptions): boolean {
        if (cards.length % 2 != 0 || cards.length <= 3) return false;
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);

        const number = (cards.length / 2) - 1;
        const start = ranks[0]
        const end = ranks[ranks.length - 1];
        if (start + number != end) return false

        //
        return true;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: CardsTypeConfig, _opt: GameOptions): boolean {
        const rankA = cardsA.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const rankB = cardsB.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);
        const {pokerRank} = _opt
        return pokerRank.indexOf(rankA[rankA.length - 1]) > pokerRank.indexOf(rankB[rankB.length - 1]);
    }

    all(cards: Array<PokerCard>, _config: CardsTypeConfig, _opt: GameOptions): Array<Array<PokerCard>> {
        const config = _config[this.type] as ConfigContinuousTreys;
        let rlt: Array<Array<PokerCard>> = [];
        const ranks = cards.map(ele => ele.rank).sort((eleA, eleB) => eleA - eleB);


        // 要取每个长度
        for (let length = config.minLength; length <= config.maxLength; length++) {

            let res = [...new Set(ranks)].map((rank) => {
                let suitable: Array<PokerCard> = [];

                for (let index = 0; index < length; length++) {
                    // TODO, 这里需要处理:
                    // KK AA 22
                    // AA 22 33
                    let thisRank = rank + index;
                    const temp = this.pokersGetSameRank(cards, thisRank, null,2);
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