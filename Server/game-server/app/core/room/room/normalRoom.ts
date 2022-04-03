import {AbstractRoom} from "./abstractRoom";
import {CreateRoomDto} from "../dto/RoomDto";
import {LookDespair} from "../../game/lookDespair";


export class NormalRoom extends AbstractRoom {

    constructor(roomId: number, params: CreateRoomDto) {
        super(roomId, params);
    }

    // 开始游戏
    public async startGame(): Promise<void> {
        this.game = new LookDespair.Game(this, this.playerList, {}, () => {
            this.onGameOver();
        })
    }

    public async onGameOver() {

    }


}