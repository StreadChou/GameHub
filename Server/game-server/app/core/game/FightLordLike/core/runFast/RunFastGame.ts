import {RunFastTable} from "./RunFastTable";
import {RunFastReferee} from "./RunFastReferee";
import {ListMap} from "../../../../../type/ListMap";
import {RunFastRole} from "./RunFastRole";
import {ClientException} from "../../../../../exception/clientException";
import {ErrorCode} from "../../../../../constant/ErrorCode";
import {AbstractFightLordLikeGame} from "../AbstractFightLordLikeGame";
import {RunFastGameConfig, RunFastGameOption} from "./RunFastGameConfig";
import {RunFastStandRule} from "./RunFastStandRule";
import {RequestOperation} from "./Operation";
import {RoomPlayer} from "../../../../room/component/roomPlayer";
import {CardsAllGt} from "../../poker/helper/CardTypeFactory";


export default class RunFastGame extends AbstractFightLordLikeGame {
    players: ListMap<RunFastRole> = new ListMap<RunFastRole>("seat"); // 这是Array和Map的组合

    config: RunFastGameConfig;
    table: RunFastTable;
    referee: RunFastReferee;
    standRule: RunFastStandRule;


    constructor(options: RunFastGameOption, callback: Function) {
        super(options.room, options.players);
        this.callback = callback;

        this.config = new RunFastGameConfig(this, options); // 初始化配置
        this.table = new RunFastTable(this);
        this.referee = new RunFastReferee(this);
        this.standRule = new RunFastStandRule(this);


        // 初始化玩家
        options.players.forEach(ele => {
            this.players.push(new RunFastRole(this, ele))
        })
    }

    get maxPlayer() {
        return this.config.options.roomConfig.maxPlayer;
    }

    get allowCardsType() {
        return this.config.options.gameConfig.allowCardsType;
    }

    get pokersConfig() {
        return this.config.options.pokersConfig;
    }

    get gameConfig() {
        return this.config.options.gameConfig;
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

    // 玩家操作
    async operate(player: RoomPlayer, operation: RequestOperation, data: any) {
        switch (operation) {
            case RequestOperation.RequestPlayPokers:
                return this.operatePlayPokers(player, data);
            case RequestOperation.RequestPass:
                return this.operatePass(player, data);
            case RequestOperation.RequestNotice:
                return this.operateNotice(player, data);
            default:
                throw new ClientException(ErrorCode.CommonError, {}, "操作不合法")
        }
    }

    operatePlayPokers(player: RoomPlayer, data: { pokers: Array<{ suit: number, rank: number }> }) {
        const role: RunFastRole = this.getRole(player.seat);
        if (!role) throw new ClientException(ErrorCode.RoleNotInGame, {}, "玩家不在游戏中")

        // 判断是否我的回合
        this.judgeInPlayerRound(role);

        const pokers = role.getPokersFromHands(data.pokers);
        if (pokers.some(ele => ele == null)) throw new ClientException(ErrorCode.IllegalOperation, {}, "所出的牌不在手牌中")
        // 告知裁判, 我要出这个牌
        this.referee.playerPlayPoker(role, pokers);
        role.removePokersFromHands(pokers);
    }

    operatePass(player: RoomPlayer, data: {}) {
        const role: RunFastRole = this.getRole(player.seat);
        if (!role) throw new ClientException(ErrorCode.RoleNotInGame, {}, "玩家不在游戏中")

        // 判断是否我的回合
        this.judgeInPlayerRound(role);

        // 告知裁判, 我要出这个牌
        this.referee.playerPass(role);
    }

    operateNotice(player: RoomPlayer, data: {}) {
        const role: RunFastRole = this.getRole(player.seat);
        if (!role) throw new ClientException(ErrorCode.RoleNotInGame, {}, "玩家不在游戏中")

        // 判断是否我的回合
        this.judgeInPlayerRound(role);
        return this.referee.noticePlayer(role);
    }

    judgeInPlayerRound(role: RunFastRole) {
        const locker = this.referee.setRoundLocker(role);
        if (locker) throw new ClientException(ErrorCode.RoleNotInGame, {}, "您已出牌")
    }


}