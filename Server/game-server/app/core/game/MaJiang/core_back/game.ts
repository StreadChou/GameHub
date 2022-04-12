import {AbstractGame} from "../../abstract/abstractGame";
import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {Player, PlayerState} from "./player";
import {Table} from "./table";
import {EventEmitter} from "events";
import {GameEvent} from "../constant/event";

export interface LookDespairCreateDto {
    config: LookDespairGameConfig;
}

export interface LookDespairGameConfig {
    maxPlayer: number;  // 玩家数量
    playerCardsNumber: number; // 玩家手牌数量
}

export type LookDespairGameConfigKey = keyof LookDespairGameConfig;


// 干瞪眼游戏
export class Game extends AbstractGame {
    playerMap: { [uid in string]: Player } = {} // 玩家
    table: Table; // 桌子
    config: LookDespairGameConfig; // 配置

    private event: EventEmitter = new EventEmitter().setMaxListeners(50);

    get playerList(): Array<Player> {
        return Object.values(this.playerMap)
    }

    constructor(room: AbstractRoom, roomPlayers: Array<RoomPlayer>, opts: LookDespairCreateDto, callback: Function) {
        super(room, roomPlayers, callback);
        this.initPlayer(roomPlayers);
        this.table = Table.generateTable(this);
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

    public getConfig(str: LookDespairGameConfigKey): LookDespairGameConfig[LookDespairGameConfigKey] {
        return this.config[str]
    }

    protected initPlayer(roomPlayers: Array<RoomPlayer>) {
        roomPlayers.forEach(roomPlayer => {
            const player = Player.generate(this, roomPlayer);
            this.playerMap[player.uid] = player;
        })
    }

    public startGame() {
        this.playerList.forEach(ele => {
            this.table.sendCardToSomeBody(ele, 5);
        })
        // 判断谁先手
        const startPlayer = this.playerList.sort((eleA, eleB) => {
            return eleB.firstHandRandom - eleA.firstHandRandom;
        })[0];
        startPlayer.gotoState(PlayerState.Round);
    }


    public endGame() {
        this.callback(this);
    }
}