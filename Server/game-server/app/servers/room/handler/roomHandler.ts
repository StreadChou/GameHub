import {Application, FrontendSession, pinus} from 'pinus';
import {SessionAttr} from "../../../constant/session";
import {RoomManager} from "../../../core/room/roomManager";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {JoinRoomDto} from "../dto/roomHandlerDto";
import {RoomPlayer} from "../../../core/room/component/roomPlayer";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {
        this.roomManager = RoomManager.getInstance();
    }

    async createRoom(msg: any, session: FrontendSession) {
        const uid = session.uid;
        const logic = session.get(SessionAttr.LogicServerId);
        const room: AbstractRoom = await this.roomManager.createRoom({});
        return {code: 200, data: {uid, logic, roomId: room.roomId}};
    }

    async selectGameType(msg: any, session: FrontendSession) {

    }

    async joinRoom(msg: JoinRoomDto, session: FrontendSession) {
        const roomId = msg.roomId;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        const player = await RoomPlayer.getInstanceByUid(session.uid);
        await room.joinRoom(player);
        return {code: 200, data: {roomId: room.roomId}};
    }

    async leaveRoom(msg: any, session: FrontendSession) {
        return {code: 200, msg: 'game server is ok.'};
    }

    async startGame(msg: JoinRoomDto, session: FrontendSession) {
        const roomId = msg.roomId;
        const room: AbstractRoom = this.roomManager.getRoomByRoomId(roomId);
        await room.startGame();
        return {code: 200, data: {roomId: room.roomId}};
    }

}