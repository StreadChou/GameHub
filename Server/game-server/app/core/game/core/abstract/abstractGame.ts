import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {Channel, pinus} from "pinus";
import {nowTimestamp} from "../../../../helper/timeHelper";
import {randomNumberBetween} from "../../../../helper/randomHelper";
import {AbstractPlayer} from "./abstractPlayer";
import {ListMap} from "../../../../type/ListMap";
import {RunFastRole} from "../../FightLordLike/core/runFast/RunFastRole";

export abstract class AbstractGame {
    room: AbstractRoom;
    channel: Channel; // 房间信道
    gameId: string; // 游戏ID
    callback: Function // callback
    players: ListMap<AbstractPlayer | any>


    protected constructor(room: AbstractRoom, players: Array<RoomPlayer>) {
        this.room = room;
        this.gameId = `${room.roomId}_${nowTimestamp()}_${randomNumberBetween(10, 99)}`
        this.makeFullGameChannel(players);
    }

    abstract startGame();

    abstract endGame();

    protected makeFullGameChannel(players: Array<RoomPlayer>) {
        this.channel = pinus.app.get('channelService').getChannel(this.gameId, true);
        players.forEach(ele => {
            this.channel.add(ele.uid, ele.fid);
        })
    }

    pushMessage(route: string, msg: any, opts ?: any, cb ?: (err: Error | null, result ?: void) => void) {
        this.channel.pushMessage(route, msg, opts, cb);
    }

    // 发送差异化数据, 对自己可见, 对别人不可见
    pushDifferentiationMessage(route: string, player: AbstractPlayer, message: any, otherMessage: any) {
        // 先给玩家自己发送
        player.pushMessage(route, message);
        this.players.forEach(ele => {
            if (player.uid != ele.uid) ele.pushMessage(route, otherMessage);
        })
    }

}