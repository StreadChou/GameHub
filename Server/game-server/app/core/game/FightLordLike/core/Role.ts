import Game from "./Game";
import {AbstractPlayer} from "../../core/abstract/abstractPlayer";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {EventEmitter} from "events";
import {PokerCard} from "../../core/poker/PokerCard";
import {PlayerEvent} from "../Interface";
import {PokerClientDto} from "../../core/poker/Interface";

export class Role extends AbstractPlayer {
    game: Game;
    roomPlayer: RoomPlayer;
    private event: EventEmitter = new EventEmitter().setMaxListeners(50);

    private handsPokers: Array<PokerCard> = []; // 手上有的牌
    private foldPokers: Array<PokerCard> = []; // 已经出的牌

    constructor(game: Game, roomPlayer: RoomPlayer) {
        super(game, roomPlayer);
    }

    public on(event: PlayerEvent, listener: (...args: any[]) => void) {
        this.event.on(event, listener);
    }

    public once(event: PlayerEvent, listener: (...args: any[]) => void) {
        this.event.once(event, listener);
    }

    public emit(event: PlayerEvent, ...args: any[]) {
        this.event.emit(event, args);
    }

    // 接收扑克
    receivePokers(pokers: Array<PokerCard>) {
        if (!pokers || pokers.length <= 0) return undefined;
        this.handsPokers = this.handsPokers.concat(pokers);
    }

    // 玩家出牌
    playPokers() {

    }

    // 根据客户端信息, 从手牌中获取卡牌
    getPokersFromHands(pokers: Array<PokerClientDto>): Array<PokerCard> {
        return [];
    }


}