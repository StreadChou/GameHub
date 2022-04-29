import {Application, FrontendSession} from 'pinus';
import {RoomManager} from "../instance/roomManager";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {RoomPlayer} from "../../../core/room/component/roomPlayer";
import {ErrorCode} from "../../../constant/ErrorCode";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {
        this.roomManager = RoomManager.getInstance();
    }

    async createRoom(msg: any, session: FrontendSession): Promise<any> {
        const uid = session.uid;
        const room: AbstractRoom = await this.roomManager.createRoom(msg.gameOption);
        return {code: ErrorCode.Success, data: {uid, roomId: room.roomId}};
    }

    async joinRoom(msg: any, session: FrontendSession): Promise<any> {
        const roomId = msg.roomId;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const player = await RoomPlayer.getInstanceByUid(session.uid);
        await room.joinRoom(player);
        return {code: 200, data: {roomId: room.roomId}};
    }

    async startGame(msg: any, session: FrontendSession): Promise<any> {
        const roomId = msg.roomId;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        await room.startGame();
        return {code: 200, data: {roomId: room.roomId}};
    }

}