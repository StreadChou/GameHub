import {CardsType} from "../../Interface";

export abstract class AbstractPokerConfig {
    than: Array<CardsType> = [CardsType.FourOfAKind]; // 比我大的类型
}
