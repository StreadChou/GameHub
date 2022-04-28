import {Application, FrontendSession} from 'pinus';
import {RoomManager} from "../../../core/room/roomManager";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {RoomPlayer} from "../../../core/room/component/roomPlayer";
import {
    RequestRoomRoomHandlerCreateRoom,
    RequestRoomRoomHandlerJoinRoom,
    RequestRoomRoomHandlerStartGame,
    ResponseRoomRoomHandlerCreateRoom,
    ResponseRoomRoomHandlerJoinRoom, ResponseRoomRoomHandlerStartGame,
} from "../../../constant/clientDto/Client2ServerDto";
import {ErrorCode} from "../../../../object/ErrorCode";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {
        this.roomManager = RoomManager.getInstance();
    }

    async createRoom(msg: RequestRoomRoomHandlerCreateRoom, session: FrontendSession): Promise<ResponseRoomRoomHandlerCreateRoom> {
        const uid = session.uid;
        const room: AbstractRoom = await this.roomManager.createRoom(msg.gameOption);
        return {code: ErrorCode.Success, data: {uid, roomId: room.roomId}};
    }

    async joinRoom(msg: RequestRoomRoomHandlerJoinRoom, session: FrontendSession): Promise<ResponseRoomRoomHandlerJoinRoom> {
        const roomId = msg.roomId;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const player = await RoomPlayer.getInstanceByUid(session.uid);
        await room.joinRoom(player);
        return {code: 200, data: {roomId: room.roomId}};
    }

    async startGame(msg: RequestRoomRoomHandlerStartGame, session: FrontendSession): Promise<ResponseRoomRoomHandlerStartGame> {
        const roomId = msg.roomId;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        await room.startGame();
        return {code: 200, data: {roomId: room.roomId}};
    }

}