import {Application, FrontendSession} from 'pinus';
import {RoomManager} from "../../../core/room/roomManager";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {
    RequestRoomGameHandlerPlay,
    ResponseRoomGameHandlerPlay
} from "../../../constant/clientDto/Client2ServerDto";
import {AbstractFightLordLikeGame} from "../../../core/game/FightLordLike/core/AbstractFightLordLikeGame";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {
        this.roomManager = RoomManager.getInstance();
    }

    async play(msg: RequestRoomGameHandlerPlay, session: FrontendSession): Promise<ResponseRoomGameHandlerPlay> {
        const roomId = msg.roomId;
        const cards = msg.cards;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const player = room.getPlayer(session.uid);
        const game = room.game;
        if (!cards || cards.length <= 0) {
            (game as AbstractFightLordLikeGame).playerPlayPokers(player.seat, cards);
        } else {
            (game as AbstractFightLordLikeGame).playerPass(player.seat);
        }
        return {code: 200, data: {roomId: room.roomId}};
    }

}