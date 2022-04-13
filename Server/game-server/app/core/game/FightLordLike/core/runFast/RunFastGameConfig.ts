import {CardsType, CardsTypeConfig} from "../../Interface";
import {RunFastGameOptions} from "./RunFastInterface";
import RunFastGame from "./RunFastGame";
import {ConfigStraight} from "../../poker/config/ConfigStraight";
import {ConfigContinuousTreys} from "../../poker/config/ConfigContinuousTreys";
import {ConfigSingle} from "../../poker/config/ConfigSingle";
import {ConfigTreys} from "../../poker/config/ConfigTreys";
import {ConfigThirtyMiles} from "../../poker/config/ConfigThirtyMiles";
import {ConfigThirtyMilesWithSingle} from "../../poker/config/ConfigThirtyMilesWithSingle";
import {ConfigFullHouse} from "../../poker/config/ConfigFullHouse";
import {ConfigThirtyMilesWithTwo} from "../../poker/config/ConfigThirtyMilesWithTwo";
import {ConfigFourOfAKind} from "../../poker/config/ConfigFourOfAKind";
import {ConfigAllJoker} from "../../poker/config/ConfigAllJoker";
import {ConfigStraightFlush} from "../../poker/config/ConfigStraightFlush";
import {GameEnum, GameTypeEnum} from "../../../Interface";

export class RunFastGameConfig {
    cardsTypeConfig: CardsTypeConfig;
    gameOption: RunFastGameOptions;

    constructor(game: RunFastGame, opts: RunFastGameOptions,) {
        this.cardsTypeConfig = {
            [CardsType.Straight]: new ConfigStraight(5, 13),
            [CardsType.ContinuousTreys]: new ConfigContinuousTreys(2, 13),

            [CardsType.Single]: new ConfigSingle(),
            [CardsType.Treys]: new ConfigTreys(),
            [CardsType.ThirtyMiles]: new ConfigThirtyMiles(),
            [CardsType.ThirtyMilesWithSingle]: new ConfigThirtyMilesWithSingle(),
            [CardsType.FullHouse]: new ConfigFullHouse(),
            [CardsType.ThirtyMilesWithTwo]: new ConfigThirtyMilesWithTwo(),
            [CardsType.FourOfAKind]: new ConfigFourOfAKind(),
            [CardsType.AllJoker]: new ConfigAllJoker(),
            [CardsType.StraightFlush]: new ConfigStraightFlush(),
        }
        this.gameOption = opts;
        this.gameOption.allowCardsType = [
            CardsType.Single,
            CardsType.Treys, CardsType.ContinuousTreys,
            CardsType.ThirtyMiles, CardsType.ThirtyMilesWithSingle, CardsType.ThirtyMilesWithTwo,
            CardsType.Straight, CardsType.FourOfAKind,
        ]
        this.gameOption.pokerRank = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2]
    }

    static checkConfig(gameOptions: RunFastGameOptions): number {
        if (gameOptions.gameEnum != GameEnum.RunFast || gameOptions.gameTypeEnum != GameTypeEnum.FightLordLike) return 1;
        if (![2, 3].includes(gameOptions.maxPlayer)) return 2;
        if (![15, 30, 60].includes(gameOptions.roundTime)) return 3;
        if (![15, 16].includes(gameOptions.perPlayerCards)) return 3;
    }
}