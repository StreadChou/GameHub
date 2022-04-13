import {AbstractGame} from "../../core/abstract/abstractGame";
import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {Player} from "./player";
import {Table} from "./table";
import {EventEmitter} from "events";
import {GameEvent} from "../constant/event";
import {StandRule} from "./standRule";
import {CardsType, CreateGameOpts, GameConfig, GameConfigKey} from "../interface";


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
        this.config = opts.config;
        this.config.pokerConfig = {
            cardsType: [

            ],
            CardsTypeConfig: {
                [CardsType.Straight]: {min: 5, minCard: 3, maxCard: 2, spanCard: [1, 2]}
            },
            pokerRankSort: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2]
        }

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
    public roundPlay(uid: string, _cards: any[], isAuto = false) {
        const player = this.playerMap[uid];
        if (!player) throw new Error("玩家不在房间")
        const cards = player.getCards(_cards, isAuto)
        if (!this.table.isCardsLegal(player, cards)) {
            throw new Error("出牌不合法")
        }

        this.table.playerPlayCards(player, cards);
    }

    // 玩家过牌
    public roundPass(uid: string) {
        const player = this.playerMap[uid];
        if (!player) throw new Error("玩家不在房间")
        this.table.playerPass(player);
    }
}