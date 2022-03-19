import {RoomPlayer} from "../component/roomPlayer";
import {CreateRoomDto, PlayerJoinRoomDto} from "../dto/RoomDto";
import {RequestParamsException} from "../../../exception/RequestParamsException";
import {ErrorCode} from "../../../constant/ErrorCode";

export abstract class AbstractRoom {
    roomId: number = 0;
    roomParams: CreateRoomDto;
    playerMap: { [key in string]: RoomPlayer } = {}
    password: string = "";

    // 检查是否可以加入房间
    public async checkPlayerCanJoinRoom(player: RoomPlayer, opts: PlayerJoinRoomDto): Promise<void> {
        if (await this.isRoomFull()) throw new RequestParamsException(ErrorCode.ROOM_IS_FULL, "检查是否可以加入房间, 但是房间已满");
        if (this.playerMap.hasOwnProperty(player.uid)) throw new RequestParamsException(ErrorCode.ALREADY_IN_ROOM, "已经在房间中");
        if (this.password && this.password != opts.password) throw new RequestParamsException(ErrorCode.PASSWORD_ERROR, "房间密码错误");
    }

    // 从房间中获取玩家
    public async getPlayerFromRoom(uid: string): Promise<RoomPlayer> {
        let player: RoomPlayer = this.playerMap[uid];
        if (!player) throw new RequestParamsException(ErrorCode.NOT_IN_ROOM);
        return player;
    }

    // 加入房间
    public async joinRoom(player: RoomPlayer): Promise<void> {
        this.playerMap[player.uid] = player;
        await this.noticeJoinRoom(player);
    }

    public async leaveRoom(player: RoomPlayer): Promise<void> {
        delete this.playerMap[player.uid];
        await this.noticeLeveRoom(player);
    }

    public async noticeJoinRoom(player: RoomPlayer) {

    }

    public async noticeLeveRoom(player: RoomPlayer) {

    }

    public async isRoomFull(): Promise<boolean> {
        return false
    }

    public abstract startGame(): Promise<void>;

}
