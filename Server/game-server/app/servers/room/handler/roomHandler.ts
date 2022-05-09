import {Application, FrontendSession} from 'pinus';
import {RoomManager} from "../instance/roomManager";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {RoomPlayer} from "../../../core/room/component/roomPlayer";
import {ErrorCode} from "../../../constant/ErrorCode";
import {AbstractRoomOption} from "../../../core/game/Interface";
import {SessionAttr} from "../../../constant/app";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {
        this.roomManager = RoomManager.getInstance();
    }

    async createRoom(message: { options: AbstractRoomOption }, session: FrontendSession): Promise<any> {
        const uid = session.uid;
        const player = await RoomPlayer.getInstanceByUid(uid);
        await player.checkCanCreateRoom();

        const room: AbstractRoom = await this.roomManager.createRoom(message.options);
        return {code: ErrorCode.Success, data: {uid, roomId: room.roomId}};
    }

    async joinRoom(msg: any, session: FrontendSession): Promise<any> {
        const uid = session.uid;

        const roomId = msg.roomId;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const player = await RoomPlayer.getInstanceByUid(uid);

        await player.checkCanJoinRoom(room);

        await room.joinRoom(player);
        session.set(SessionAttr.RoomId, roomId);
        await session.apush(SessionAttr.RoomId);

        return {code: ErrorCode.Success, data: {uid, roomId: room.roomId}};
    }

    async startGame(msg: any, session: FrontendSession): Promise<any> {
        const roomId = session.get(SessionAttr.RoomId);
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        await room.startGame();
        return {code: 200, data: {roomId: room.roomId}};
    }

    async leaveRoom(msg: any, session: FrontendSession): Promise<any> {
        const uid = session.uid;
        const roomId = session.get(SessionAttr.RoomId);
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const player = await RoomPlayer.getInstanceByUid(uid);
        await room.leaveRoom(player);
        return {code: 200, data: {roomId: room.roomId}};
    }

}