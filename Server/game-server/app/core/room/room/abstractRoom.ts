import {RoomPlayer} from "../component/roomPlayer";
import {PlayerJoinRoomDto} from "../dto/RoomDto";

export abstract class AbstractRoom {
    roomId: string;

    public abstract checkPlayerCanJoinRoom(player: RoomPlayer, opts: PlayerJoinRoomDto): Promise<void>;
}
