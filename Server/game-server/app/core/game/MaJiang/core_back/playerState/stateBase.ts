import {Player, PlayerState} from "../player";
import {Game} from "../game";
import {Table} from "../table";

export abstract class StateBase {
    abstract state: PlayerState;
    player: Player;

    // 阶段时间
    protected phaseTime: number = 0;
    // 阶段倒计时
    timer: NodeJS.Timeout;

    protected constructor(player: Player) {
        this.player = player;
    }

    get game(): Game {
        return this.player.game;
    }

    get table(): Table {
        return this.game.table
    }


    // 进入当前阶段
    start() {
        this.before();
        this.deal();
        this.after();
    }


    before() {

    }


    abstract deal()


    after() {
        this.timer = setTimeout(() => {
            this.player.next();
        }, 20 * 1000);
    }


    // 当前阶段结束
    end() {
        clearTimeout(this.timer);
        this.timer = null;
    }
}