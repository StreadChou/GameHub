import {RunFastTable} from "./RunFastTable";
import {RunFastReferee} from "./RunFastReferee";
import {ListMap} from "../../../../../type/ListMap";
import {RunFastRole} from "./RunFastRole";
import {ClientException} from "../../../../../exception/clientException";
import {ErrorCode} from "../../../../../constant/ErrorCode";
import {AbstractFightLordLikeGame} from "../AbstractFightLordLikeGame";
import {RunFastGameConfig, RunFastGameOption} from "./RunFastGameConfig";
import {RunFastStandRule} from "./RunFastStandRule";


export default class RunFastGame extends AbstractFightLordLikeGame {
    table: RunFastTable = new RunFastTable(this);
    referee: RunFastReferee = new RunFastReferee(this);
    players: ListMap<RunFastRole> = new ListMap<RunFastRole>("seat"); // 这是Array和Map的组合
    standRule: RunFastStandRule = new RunFastStandRule(this);
    config: RunFastGameConfig;


    constructor(options: RunFastGameOption, callback: Function) {
        super(options.room, options.players);
        this.callback = callback;
        this.config = new RunFastGameConfig(this, options); // 初始化配置

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

    // 玩家出牌
    playerPlayPokers(seat: number, _pokers: Array<any>) {
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