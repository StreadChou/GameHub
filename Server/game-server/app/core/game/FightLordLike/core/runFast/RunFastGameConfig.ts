import {CardsType, CardsTypeConfig} from "../../Interface";
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
import {RunFastRoom} from "../../../../room/room/runFastRoom";
import {RoomPlayer} from "../../../../room/component/roomPlayer";
import {RunFastRoomOptions} from "../../../Interface";
import {AbstractFightLordLikeConfig, FightLordLikeGameConfig} from "../AbstractFightLordLikeConfig";


export interface RunFactGameConfig extends FightLordLikeGameConfig{
    allowCardsType: Array<CardsType>,
    pokerRank: Array<number>,
    pokerNumber: number,
    roundTime: number,
}

// 开始游戏需要的内容
export interface RunFastGameOption {
    room: RunFastRoom
    players: Array<RoomPlayer>
    // 记录牌型的一些配置, 比如 对2 是不是对子等
    pokersConfig: CardsTypeConfig,
    // 游戏配置
    gameConfig: RunFactGameConfig
    // 房间配置
    roomConfig: {
        maxPlayer: number;
    },
}

export class RunFastGameConfig extends AbstractFightLordLikeConfig {
    options: RunFastGameOption;

    constructor(game: RunFastGame, options: RunFastGameOption) {
        super();
        this.options = options;
    }


    static checkConfig(gameOptions: RunFastRoomOptions): number {
        return 0;
    }

    static generateGameConfig(room: RunFastRoom): RunFastGameOption {
        return {
            room: room,
            players: room.players.list(),
            pokersConfig: {
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
            },
            gameConfig: {
                allowCardsType: [CardsType.Single, CardsType.Treys, CardsType.ContinuousTreys, CardsType.ThirtyMiles, CardsType.ThirtyMilesWithSingle, CardsType.ThirtyMilesWithTwo, CardsType.Straight, CardsType.FourOfAKind],
                pokerRank: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2],
                pokerNumber: room.gameOption.pokerNumber,
                roundTime: 60,
            },
            roomConfig: {
                maxPlayer: room.gameOption.maxPlayer,
            },
        }
    }
}