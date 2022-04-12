import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {AbstractGame} from "../../abstract/abstractGame";
import {CardsType, CardsTypeConfig, GameOptions} from "../Interface";
import {ConfigStraight} from "../poker/config/ConfigStraight";

export default class Game extends AbstractGame {

    cardsTypeConfig: CardsTypeConfig;
    gameOption: GameOptions;

    constructor(room: AbstractRoom, roomPlayers: Array<RoomPlayer>, opts: GameOptions, callback: Function) {
        super(room, roomPlayers, callback);
        this.cardsTypeConfig = {
            [CardsType.Straight]: new ConfigStraight(5, 13),
        }
        this.gameOption = {
            allowCardsType: [
                CardsType.Single,
                CardsType.Treys, CardsType.ContinuousTreys,
                CardsType.ThirtyMiles, CardsType.ThirtyMilesWithSingle, CardsType.ThirtyMilesWithTwo,
                CardsType.Straight, CardsType.FourOfAKind,
            ],
            pokerRank: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2],
            maxPlayer: opts.maxPlayer,
            roundTime: opts.roundTime,
            perPlayerCards: opts.perPlayerCards,
        }
    }


    // 游戏开始
    startGame() {

    }

    // 游戏结束
    endGame() {

    }
}