import {AbstractRoom} from "./abstractRoom";
import {CreateRoomDto} from "../dto/RoomDto";


export class NormalRoom extends AbstractRoom {

    constructor(roomId: number, params: CreateRoomDto) {
        super(roomId, params);
    }

    // 开始游戏
    public async startGame(): Promise<void> {

    }


}