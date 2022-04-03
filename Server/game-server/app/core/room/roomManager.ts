import {CreateRoomDto, PlayerJoinRoomDto} from "./dto/RoomDto";
import {NormalRoom} from "./room/normalRoom";
import {RequestParamsException} from "../../exception/RequestParamsException";
import {ErrorCode} from "../../constant/ErrorCode";
import {AbstractRoom} from "./room/abstractRoom";
import {RoomPlayer} from "./component/roomPlayer";
import {randomNumberBetween} from "../../helper/randomHelper";

export class RoomManager {
    private static _instance: RoomManager;
    roomMap: { [key in number]: AbstractRoom } = {};

    private constructor() {
        // 单例
    }

    public static getInstance(): RoomManager {
        if (this._instance) return this._instance;
        this._instance = new RoomManager();
        return this._instance;
    }

    async createRoom(createRoomDto: CreateRoomDto): Promise<AbstractRoom> {
        let roomId: number = await this.generateRandomRoomId();
        let room = new NormalRoom(roomId, createRoomDto);
        this.roomMap[roomId] = room;
        return room;
    }

    async joinRoom(roomId: number, uid: string, opts: PlayerJoinRoomDto) {
        let room: AbstractRoom = await this.getRoomByRoomId(roomId);
        let player: RoomPlayer = await RoomPlayer.getInstanceByUid(uid);

        // 检查是否可以加入房间
        await room.checkPlayerCanJoinRoom(player, opts);

        await room.joinRoom(player);
    }

    async leaveRoom(roomId: number, uid: string) {
        let room: AbstractRoom = await this.getRoomByRoomId(roomId);
        let player: RoomPlayer = await room.getPlayerFromRoom(uid);
        await room.leaveRoom(player);
    }

    // 踢出房间
    async kickOutRoom(roomId: number, uid: string, targetUId: string) {
        let room: AbstractRoom = await this.getRoomByRoomId(roomId);
        // 获取玩家
        let player: RoomPlayer = await room.getPlayerFromRoom(uid);
        let targetPlayer: RoomPlayer = await room.getPlayerFromRoom(targetUId);
        // 踢出玩家
        await player.checkCanKickPlayer(targetPlayer)
        await room.leaveRoom(targetPlayer);
    }

    // 根据ID获取房间, 返回一定是房间
    public getRoomByRoomId(roomId: number): AbstractRoom {
        let room = this.roomMap[roomId];
        if (!room) throw new RequestParamsException(ErrorCode.ROOM_NOT_EXIST);
        return room;
    }


    // 生成唯一的房间ID
    protected async generateRandomRoomId(): Promise<number> {
        return randomNumberBetween(100000, 999999);
    }
}