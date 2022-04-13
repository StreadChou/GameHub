import {AbstractRoom} from "../../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../../room/component/roomPlayer";
import {RunFastTable} from "./RunFastTable";
import {RunFastReferee} from "./RunFastReferee";
import {ListMap} from "../../../../../type/ListMap";
import {RunFastRole} from "./RunFastRole";
import {ClientException} from "../../../../../exception/clientException";
import {ErrorCode} from "../../../../../constant/ErrorCode";
import {AbstractFightLordLikeGame} from "../AbstractFightLordLikeGame";
import {RunFastGameOptions} from "./RunFastInterface";
import {RunFastGameConfig} from "./RunFastGameConfig";
import {RunFastStandRule} from "./RunFastStandRule";
import {PokerClientDto} from "../../../../../constant/clientDto/DtoConstant";


export default class RunFastGame extends AbstractFightLordLikeGame {
    table: RunFastTable = new RunFastTable(this);
    referee: RunFastReferee = new RunFastReferee(this);
    players: ListMap<RunFastRole> = new ListMap<RunFastRole>("seat"); // 这是Array和Map的组合
    standRule: RunFastStandRule = new RunFastStandRule(this);
    config: RunFastGameConfig;


    constructor(room: AbstractRoom, roomPlayers: Array<RoomPlayer>, opts: RunFastGameOptions, callback: Function) {
        super(room, roomPlayers);
        this.callback = callback;

        this.config = new RunFastGameConfig(this, opts); // 初始化配置

        // 初始化玩家
        roomPlayers.forEach(ele => {
            this.players.push(new RunFastRole(this, ele))
        })
    }

    get gameOption() {
        return this.config.gameOption;
    }

    get cardsTypeConfig() {
        return this.config.cardsTypeConfig;
    }

    getRole(seat: number): RunFastRole {
        return this.players.key(seat);
    }


    // 游戏开始
    startGame() {
        this.standRule.next();
    }

    // 游戏结束
    endGame() {
        this.callback(this);
    }

    // 玩家出牌
    playerPlayPokers(seat: number, _pokers: Array<PokerClientDto>) {
        const role: RunFastRole = this.getRole(seat);
        if (!role) throw new ClientException(ErrorCode.RoleNotInGame, {}, "玩家不在游戏中")

        const locker = this.referee.setRoundLocker(role);
        if (locker) throw new ClientException(ErrorCode.RoleNotInGame, {}, "您已出牌")

        const pokers = role.getPokersFromHands(_pokers);
        if (!pokers) throw new ClientException(ErrorCode.IllegalOperation, {}, "所出的牌不在手牌中")

        // 告知裁判, 我要出这个牌
        this.referee.playerPlayPoker(role, pokers);

        role.removePokersFromHands(pokers);
    }

    // 玩家过牌
    playerPass(eat: number) {

    }
}