// 登录
import {ErrorCode} from "../constant/ErrorCode";
import {GameOptions} from "../core/game/Interface";

// 默认回文
export class DefaultResponse {
    code: ErrorCode
    data?: any
    message?: string
}





// 创建房间
export class C2SCreateRoomRequestVo {
    gameOption: GameOptions;
}