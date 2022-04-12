import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {CreateGameOpts} from "../../runFast/interface";
import {AbstractGame} from "../../abstract/abstractGame";
import {FactoryUseConfig, FactoryUseOption} from "../poker/helper/CardTypeFactory";
import {CardsType} from "../Interface";
import {ConfigStraight} from "../poker/config/ConfigStraight";

export default class Game extends AbstractGame {
    allowCardsType: Array<CardsType>;
    cardsTypeConfig: FactoryUseConfig;
    gameOption: FactoryUseOption;

    constructor(room: AbstractRoom, roomPlayers: Array<RoomPlayer>, opts: CreateGameOpts, callback: Function) {
        super(room, roomPlayers, callback);
        this.allowCardsType = [
            CardsType.Single,
            CardsType.Treys,
            CardsType.ThirtyMiles,
            CardsType.ThirtyMilesWithSingle,
            CardsType.ThirtyMilesWithTwo,
            CardsType.ContinuousTreys,
            CardsType.Straight,
            CardsType.FourOfAKind,
        ]
        this.cardsTypeConfig = {
            [CardsType.Straight]: new ConfigStraight(5, 13),
        }
        this.gameOption = {
            pokerRank: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2]
        }
    }


    // 游戏开始
    startGame() {

    }

    // 游戏结束
    endGame() {

    }
}