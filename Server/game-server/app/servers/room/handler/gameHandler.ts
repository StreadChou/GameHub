import {Application, FrontendSession, pinus} from 'pinus';
import {SessionAttr} from "../../../constant/session";
import {RoomManager} from "../../../core/room/roomManager";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {JoinRoomDto} from "../dto/roomHandlerDto";
import {RoomPlayer} from "../../../core/room/component/roomPlayer";
import {RunFast} from "../../../core/game/runFast";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {
        this.roomManager = RoomManager.getInstance();
    }

    async play(msg: any, session: FrontendSession) {
        const roomId = msg.roomId;
        const cards = msg.cards;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const game = room.game;
        (game as RunFast.Game).roundPlay(session.uid, cards);
        return {code: 200, data: {roomId: room.roomId}};
    }

}