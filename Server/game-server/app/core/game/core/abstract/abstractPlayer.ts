import {RoomPlayer} from "../../../room/component/roomPlayer";
import {AbstractGame} from "./abstractGame";
import {GamePushRoute} from "../../../../constant/Route";

export abstract class AbstractPlayer {
    game: AbstractGame;
    roomPlayer: RoomPlayer;


    uid: string = "";
    fid: string = ""

    seat: number = 0;


    protected constructor(game: AbstractGame, roomPlayer: RoomPlayer) {
        this.game = game;
        this.roomPlayer = roomPlayer;

        this.uid = this.roomPlayer.uid;
        this.fid = this.roomPlayer.fid;
        this.seat = this.roomPlayer.seat;
    }

    pushMessage(operation: string, msg: any, opts?: any, cb?: (err?: Error, result?: void) => void) {
        this.roomPlayer.pushMessage(GamePushRoute.OnOperation, {operation, data: msg}, opts, cb)
    }
}