import {AbstractRoom} from "./abstractRoom";
import {CreateRoomDto} from "../dto/RoomDto";
import {GameClassMap, GameFactory, GameType} from "../../game/GameFactory";
import {CreateGameOpts} from "../../game/runFast/interface";


export class NormalRoom extends AbstractRoom {

    constructor(roomId: number, params: CreateRoomDto) {
        super(roomId, params);
    }

    // 开始游戏
    public async startGame(): Promise<void> {
        const gameType = GameType.RunFast;
        const GameClass = GameFactory(gameType);
        const opts: CreateGameOpts = {
            maxPlayer: this.maxPlayer,
            config: this.gameConfig,
        }
        this.game = new GameClass(this, this.playerList, opts, () => {
            this.onGameOver();
        })
    }

    public async onGameOver() {

    }


}