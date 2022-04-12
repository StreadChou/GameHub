import {AbstractPokerHelp} from "./PokerHelper";
import {PokerCard} from "../../../core/poker/PokerCard";
import {PokerSuit} from "../../../core/poker/Interface";
import {CardsType} from "../../../runFast/interface";
import {GameType} from "../../../GameFactory";
import {AbstractPokerConfig} from "../config/PokerConfig";
import {FactoryUseConfig, FactoryUseOption} from "./CardTypeFactory";

// 王炸
export class TypeAllJoker extends AbstractPokerHelp {
    type: CardsType;

    private static _instance: TypeAllJoker;

    protected constructor() {
        super();
    }

    public static getInstance(): TypeAllJoker {
        TypeAllJoker._instance = TypeAllJoker._instance ?? new TypeAllJoker();
        return TypeAllJoker._instance;
    }


    is(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean{
        if (cards.length < 2) return false;
        const suits = cards.map(ele => ele.suit);
        const allSuit = suits.every(ele => ele == PokerSuit.JOKER);
        if (!allSuit) return false;
        //
        return true;
    }

    check(cardsA: Array<PokerCard>, cardsB: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): boolean{
        return false;
    }

    all(cards: Array<PokerCard>, _config: FactoryUseConfig, _opt: FactoryUseOption): Array<Array<PokerCard>> {
        return []
    }

}