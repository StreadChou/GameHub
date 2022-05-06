import {Application, FrontendSession} from 'pinus';
import {RoomManager} from "../instance/roomManager";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {SessionAttr} from "../../../constant/app";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {
        this.roomManager = RoomManager.getInstance();
    }

    // async play(msg: any, session: FrontendSession): Promise<any> {
    //     const roomId = msg.roomId;
    //     const cards = msg.cards;
    //     const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
    //     const player = room.getPlayer(session.uid);
    //     const game = room.game;
    //     if (!cards || cards.length <= 0) {
    //         (game as AbstractFightLordLikeGame).playerPlayPokers(player.seat, cards);
    //     } else {
    //         (game as AbstractFightLordLikeGame).playerPass(player.seat);
    //     }
    //     return {code: 200, data: {roomId: room.roomId}};
    // }

    async operate(msg: any, session: FrontendSession): Promise<any> {
        const roomId = session.get(SessionAttr.RoomId);

        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const game = room.game;

        const {operation, data} = msg;
        const roomPlayer = room.getPlayer(session.uid);

        await game.operate(roomPlayer, operation, data);

    }

}