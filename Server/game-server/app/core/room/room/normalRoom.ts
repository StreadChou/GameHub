import {AbstractRoom} from "./abstractRoom";
import {CreateRoomDto} from "../dto/RoomDto";


export class NormalRoom extends AbstractRoom {
    constructor(roomId: number, params: CreateRoomDto) {
        super();
        this.roomId = roomId;
        this.roomParams = params;
    }

    // 开始游戏
    public async startGame(): Promise<void> {
        
    }


}