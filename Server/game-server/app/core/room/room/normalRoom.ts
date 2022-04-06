import {AbstractRoom} from "./abstractRoom";
import {CreateRoomDto} from "../dto/RoomDto";
import {LookDespair} from "../../game/lookDispair";
import {LookDespairCreateOpts} from "../../game/lookDispair/interface";


export class NormalRoom extends AbstractRoom {

    constructor(roomId: number, params: CreateRoomDto) {
        super(roomId, params);
    }

    // 开始游戏
    public async startGame(): Promise<void> {
        const opts: LookDespairCreateOpts = {
            config: {
                maxPlayer: 4,
                playerCardsNumber: 5,
            }
        }
        this.game = new LookDespair.Game(this, this.playerList, opts, () => {
            this.onGameOver();
        })
    }

    public async onGameOver() {

    }


}