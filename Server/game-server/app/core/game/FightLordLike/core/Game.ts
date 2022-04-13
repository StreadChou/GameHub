import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {AbstractGame} from "../../core/abstract/abstractGame";
import {CardsType, CardsTypeConfig, GameOptions} from "../Interface";
import {ConfigStraight} from "../poker/config/ConfigStraight";
import {Table} from "./Table";
import {Referee} from "./Referee";
import {ListMap} from "../../../../type/ListMap";
import {Role} from "./Role";
import {ClientException} from "../../../../exception/clientException";
import {ErrorCode} from "../../../../constant/ErrorCode";
import {PokerClientDto} from "../../core/poker/Interface";

export default class Game extends AbstractGame {
    table: Table = new Table(this);
    referee: Referee = new Referee(this);
    roleListType: ListMap<Role> = new ListMap<Role>("seat"); // 这是Array和Map的组合

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
        roomPlayers.forEach(ele => {
            this.roleListType.push(new Role(this, ele))
        })
    }

    getRole(seat: number): Role {
        return this.roleListType.key(seat);
    }


    // 游戏开始
    startGame() {

    }

    // 游戏结束
    endGame() {

    }

    // 玩家出牌
    playerPlayPokers(seat: number, _pokers: Array<PokerClientDto>) {
        const role: Role = this.getRole(seat);
        if (!role) throw new ClientException(ErrorCode.RoleNotInGame, {}, "玩家不在游戏中")

        const locker = this.referee.setRoundLocker(role);
        if (locker) throw new ClientException(ErrorCode.RoleNotInGame, {}, "您已出牌")

        const pokers = role.getPokersFromHands(_pokers);
        if (!pokers) throw new ClientException(ErrorCode.IllegalOperation, {}, "所出的牌不在手牌中")

        // 告知裁判, 我要出这个牌
        this.referee.playerPlayPoker(role, pokers);


    }

    // 玩家过牌
    playerPass() {

    }
}