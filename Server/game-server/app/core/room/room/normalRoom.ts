import {AbstractRoom} from "./abstractRoom";
import {CreateRoomDto} from "../dto/RoomDto";
import {LookDespair} from "../../game/lookDispair";
import {LookDespairCreateOpts} from "../../game/lookDispair/interface";
import {GameClassMap, GameFactory, GameType} from "../../game/GameFactory";


export class NormalRoom extends AbstractRoom {

    constructor(roomId: number, params: CreateRoomDto) {
        super(roomId, params);
    }

    // 开始游戏
    public async startGame(): Promise<void> {
        const gameType = GameType.RunFast;
        const GameClass = GameFactory(gameType);
        const opts: LookDespairCreateOpts = {
            config: {
                maxPlayer: 3,
                playerCardsNumber: 15,
            }
        }
        this.game = new GameClass(this, this.playerList, opts, () => {
            this.onGameOver();
        })
    }

    public async onGameOver() {

    }


}