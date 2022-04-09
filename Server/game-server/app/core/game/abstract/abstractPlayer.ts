import {RoomPlayer} from "../../room/component/roomPlayer";

export abstract class AbstractPlayer {
    uid: string = "";
    fid: string = ""

    seat: number = 0;
    roomPlayer: RoomPlayer

    protected constructor(roomPlayer: RoomPlayer) {
        this.roomPlayer = roomPlayer;
        this.uid = this.roomPlayer.uid;
        this.fid = this.roomPlayer.fid;
        this.seat = this.roomPlayer.seat;
    }

    pushMessage(route: string, msg: any, opts?: any, cb?: (err?: Error, result?: void) => void) {
        this.roomPlayer.pushMessage(route, msg, opts, cb)
    }
}