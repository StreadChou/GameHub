import {GameState, OnPhaseMessage} from "../../interface";
import {StandRule} from "../standRule";
import {Game} from "../game";
import {Table} from "../table";
import {Player} from "../player";
import {GamePushRoute} from "../../../../../constant/Route";

export abstract class StateBase {
    abstract state: GameState;
    standRule: StandRule;
    phaseTime = 0;
    phaseTimer: NodeJS.Timeout;

    get game(): Game {
        return this.standRule.game;
    }

    get table(): Table {
        return this.game.table;
    }

    get playerMap(): { [uid in string]: Player } {
        return this.game.playerMap;
    }

    get playerList(): Array<Player> {
        return this.game.playerList;
    }

    protected constructor(standRule: StandRule) {
        this.standRule = standRule;
    }

    /**
     * 开始阶段
     * @param fromPhase 从哪个阶段来的, 结束了那个阶段, 才来到当前阶段
     * @param nowPhase 当前阶段, 开始的是哪个阶段
     */
    public start(fromPhase: GameState, nowPhase: GameState) {
        this.before();
        this.deal();
        this.after();
        this.transition();
    }

    public before = () => undefined;


    abstract deal()


    public after = () => undefined;

    public transition = () => {
        this.phaseTimer = setTimeout(() => {
            this.standRule.next();
        }, this.phaseTime * 1000)
    }


    /**
     * 结束阶段
     * @param nowPhase 当前阶段, 结束的是哪个阶段
     * @param toPhase 去哪个阶段, 要结束当前阶段,去另一个阶段
     */
    public end = (nowPhase: GameState, toPhase: GameState) => {

    }


    makeStateMessage(): OnPhaseMessage {
        return {
            phase: this.state,
            time: this.phaseTime,
        };
    }

    sendPhaseMessage(message: OnPhaseMessage) {
        this.game.pushMessage(GamePushRoute.OnPhase, message);
    }


}