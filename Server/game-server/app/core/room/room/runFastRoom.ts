import {AbstractRoom} from "./abstractRoom";
import {RunFastGameConfig} from "../../game/FightLordLike/core/runFast/RunFastGameConfig";
import {RunFastRoomOptions} from "../../game/Interface";
import {ClientException} from "../../../exception/clientException";
import {ErrorCode} from "../../../constant/ErrorCode";
import RunFastGame from "../../game/FightLordLike/core/runFast/RunFastGame";


export class RunFastRoom extends AbstractRoom {
    gameOption: RunFastRoomOptions; // 游戏选项

    protected setGameOptions(options: RunFastRoomOptions) {
        this.checkOptions(options);
        this.gameOption = options;
    }

    // 开始游戏
    public async startGame(): Promise<void> {
        const gameConfig = RunFastGameConfig.generateGameConfig(this);
        
        new RunFastGame(gameConfig, () => {

        })
    }


    // 检查客户端的option是否合法
    protected checkOptions(options: RunFastRoomOptions): void {
        const checkRes = RunFastGameConfig.checkConfig(options);
        if (checkRes > 0) throw new ClientException(ErrorCode.GameConfigError, {checkRes}, "游戏配置错误");
        return undefined;
    }


}