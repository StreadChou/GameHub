import {AbstractGame} from "../../abstract/abstractGame";
import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {Player} from "./player";
import {Table} from "./table";
import {EventEmitter} from "events";
import {GameEvent} from "../constant/event";
import {StandRule} from "./standRule";
import {CreateGameOpts, GameConfig, GameConfigKey} from "../interface";


// 干瞪眼游戏
export class Game extends AbstractGame {
    playerMap: { [uid in string]: Player } = {} // 玩家
    table: Table; // 桌子
    config: GameConfig; // 配置
    standRule: StandRule;
    private event: EventEmitter = new EventEmitter().setMaxListeners(50);
    activityUser: string;

    get playerList(): Array<Player> {
        return Object.values(this.playerMap)
    }

    constructor(room: AbstractRoom, roomPlayers: Array<RoomPlayer>, opts: CreateGameOpts, callback: Function) {
        super(room, roomPlayers, callback);
        this.initPlayer(roomPlayers);
        this.table = Table.generateTable(this);
        this.standRule = new StandRule(this);
        this.startGame();
    }

    public on(event: GameEvent, listener: (...args: any[]) => void) {
        this.event.on(event, listener);
    }

    public once(event: GameEvent, listener: (...args: any[]) => void) {
        this.event.once(event, listener);
    }

    public emit(event: GameEvent, ...args: any[]) {
        this.event.emit(event, args);
    }

    public getConfig(str: GameConfigKey): GameConfig[GameConfigKey] {
        return this.config[str]
    }

    protected initPlayer(roomPlayers: Array<RoomPlayer>) {
        roomPlayers.forEach(roomPlayer => {
            const player = Player.generate(this, roomPlayer);
            this.playerMap[player.uid] = player;
        })
    }

    public startGame() {
        this.standRule.next();
    }


    public endGame() {
        this.callback(this);
    }

    // 出牌
    public roundPlay(uid: string, _cards: any[]) {
        const player = this.playerMap[uid];
        if (!player) throw new Error("玩家不在房间")

        const cards = Table.generateStandardCard()
    }

    // 玩家过牌
    public roundPass(uid: string, _cards: any[]) {
        const player = this.playerMap[uid];
        if (!player) throw new Error("玩家不在房间")
        const cards = Table.generateStandardCard()
    }
}