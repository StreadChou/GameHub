import {CardsType} from "../Interface";

export interface FightLordLikeGameConfig {
    allowCardsType: Array<CardsType>,
    pokerRank: Array<number>,
    pokerNumber: number,
    roundTime: number,
}

export abstract class AbstractFightLordLikeConfig {

}