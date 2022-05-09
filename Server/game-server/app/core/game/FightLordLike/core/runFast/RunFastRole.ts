import RunFastGame from "./RunFastGame";
import {AbstractPlayer} from "../../../core/abstract/abstractPlayer";
import {RoomPlayer} from "../../../../room/component/roomPlayer";
import {EventEmitter} from "events";
import {PokerCard} from "../../../core/poker/PokerCard";
import {PlayerEvent} from "../../Interface";

export class RunFastRole extends AbstractPlayer {
    game: RunFastGame;
    roomPlayer: RoomPlayer;
    private event: EventEmitter = new EventEmitter().setMaxListeners(50);

    public handsPokers: Array<PokerCard> = []; // 手上有的牌
    private foldPokers: Array<PokerCard> = []; // 已经出的牌

    constructor(game: RunFastGame, roomPlayer: RoomPlayer) {
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

    // 根据客户端信息, 从手牌中获取卡牌
    getPokersFromHands(pokers: Array<any | PokerCard>): Array<PokerCard> {
        const rlt: Array<PokerCard> = []
        this.handsPokers.forEach(poker => {
            const res = pokers.some(ele => ele.suit == poker.suit && ele.rank == poker.rank);
            if (!res) return null;
            rlt.push(poker);
        })
        return rlt;
    }

    // 从玩家手牌中移除卡牌
    removePokersFromHands(pokers: Array<PokerCard>) {
        const newArray: Array<PokerCard> = []
        this.handsPokers.forEach((ele) => {
            if (pokers.includes(ele)) return null;
            newArray.push(ele)
        })
        this.foldPokers = this.foldPokers.concat(pokers);
        this.handsPokers = newArray;
        this.game.table.playerPlayPokers(pokers)
    }


}