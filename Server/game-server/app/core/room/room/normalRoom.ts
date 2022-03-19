import {AbstractRoom} from "./abstractRoom";
import {CreateRoomDto, PlayerJoinRoomDto} from "../dto/RoomDto";
import {RoomPlayer} from "../component/roomPlayer";
import {RequestParamsException} from "../../../exception/RequestParamsException";
import {ErrorCode} from "../../../constant/ErrorCode";


export class NormalRoom extends AbstractRoom {
    constructor(roomId: number, params: CreateRoomDto) {
        super();
    }


    // 检查用户是否可以加入房间
    public async checkPlayerCanJoinRoom(player: RoomPlayer, opts: PlayerJoinRoomDto): Promise<void> {
        if (await this.isRoomFull()) {
            throw new RequestParamsException(ErrorCode.ROOM_IS_FULL, "检查是否可以加入房间, 但是房间已满");
        }
    }


    // 检查房间是否已经满了
    public async isRoomFull(): Promise<boolean> {
        return false;
    }


}