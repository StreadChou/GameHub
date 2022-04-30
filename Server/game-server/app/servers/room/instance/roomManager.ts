import {ErrorCode} from "../../../constant/ErrorCode";
import {AbstractRoom} from "../../../core/room/room/abstractRoom";
import {RoomPlayer} from "../../../core/room/component/roomPlayer";
import {ClientException} from "../../../exception/clientException";
import {RunFastRoom} from "../../../core/room/room/runFastRoom";
import {AbstractRoomOption, GameEnum} from "../../../core/game/Interface";

export class RoomManager {
    private static _instance: RoomManager;
    roomMap: { [key in number]: AbstractRoom } = {};
    roomIdRecord = 10000;

    private constructor() {
        // 单例
    }

    public static getInstance(): RoomManager {
        if (this._instance) return this._instance;
        this._instance = new RoomManager();
        return this._instance;
    }

    // 创建房间
    async createRoom(options: AbstractRoomOption): Promise<AbstractRoom> {
        let roomId: number = await this.generateRoomId();
        let room = RoomFactory(roomId, options);
        this.roomMap[roomId] = room;
        return room;
    }

    async joinRoom(roomId: number, uid: string) {
        let room: AbstractRoom = await this.getRoomByRoomId(roomId);
        let player: RoomPlayer = await RoomPlayer.getInstanceByUid(uid);
        await room.joinRoom(player);
    }

    async leaveRoom(roomId: number, uid: string) {
        let room: AbstractRoom = await this.getRoomByRoomId(roomId);
        let player: RoomPlayer = await room.getPlayer(uid);
        await room.leaveRoom(player);
    }

    // 根据ID获取房间, 返回一定是房间
    public getRoomByRoomId(roomId: number): AbstractRoom {
        let room = this.roomMap[roomId];
        if (!room) throw new ClientException(ErrorCode.RoomNotExist, {}, "房间不存在");
        return room;
    }


    // 生成唯一的房间ID
    protected async generateRoomId(): Promise<number> {
        return this.roomIdRecord++;
    }
}

export function RoomFactory(roomId: number, options: AbstractRoomOption) {
    switch (options.gameEnum) {
        case GameEnum.RunFast:
            return new RunFastRoom(roomId, options);

    }
}