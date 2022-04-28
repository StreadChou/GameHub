import {AbstractRoom} from "./abstractRoom";
import {GameEnum, GameOptions} from "../../game/Interface";
import {RunFastGameOptions} from "../../game/FightLordLike/core/runFast/RunFastInterface";
import RunFastGame from "../../game/FightLordLike/core/runFast/RunFastGame";
import {ClientException} from "../../../exception/clientException";
import {ErrorCode} from "../../../../object/ErrorCode";
import {RunFastGameConfig} from "../../game/FightLordLike/core/runFast/RunFastGameConfig";


export class NormalRoom extends AbstractRoom {
    constructor(roomId: number, gameOptions: GameOptions) {
        super(roomId, gameOptions);
    }

    protected setGameOptions(gameOptions: GameOptions) {
        this.checkOptions(gameOptions);
        this.gameOption = gameOptions;
    }

    // 开始游戏
    public async startGame(): Promise<void> {
        switch (this.gameOption.gameEnum) {
            case GameEnum.RunFast:
                this.game = new RunFastGame(this, this.players.list(), this.gameOption as RunFastGameOptions, () => {
                    this.onGameOver();
                })
                break;
            default:
                throw new ClientException(ErrorCode.GameConfigError, {}, "游戏类型不被支持");
        }

    }

    public async onGameOver() {

    }

    protected checkOptions(gameOptions: GameOptions): void {
        switch (gameOptions.gameEnum) {
            case GameEnum.RunFast:
                const checkRes = RunFastGameConfig.checkConfig(gameOptions as RunFastGameOptions);
                if (checkRes > 0) throw new ClientException(ErrorCode.GameConfigError, {checkRes}, "游戏配置错误");
                break;
            default:
                throw new ClientException(ErrorCode.GameConfigError, {}, "游戏类型不被支持");
        }
    }


}