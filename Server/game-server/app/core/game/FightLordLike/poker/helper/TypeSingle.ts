import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType} from "../../../runFast/interface";
import {GameType} from "../../../GameFactory";
import {AbstractPokerConfig} from "../config/PokerConfig";
import {FactoryUseConfig, FactoryUseOption} from "./CardTypeFactory";


// 单张
export class TypeSingle extends AbstractPokerHelp {
    type: CardsType = CardsType.Single;

    private static _instance: TypeSingle;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeSingle {
        TypeSingle._instance = TypeSingle._instance ?? new TypeSingle();
        return TypeSingle._instance;
    }


    is(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean{
        return cards.length == 1;

    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean{
        const {pokerRank} = _opt
        return pokerRank.indexOf(cardsA[0].rank) > pokerRank.indexOf(cardsB[0].rank);
    }


    all(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): Array<Array<PokerCard>> {
        return cards.map(ele => {
            return [ele]
        })
    }
}