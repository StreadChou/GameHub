// 服务器通知玩家收到了卡牌
import {PokerClientDto, RoomRoomPlayerClientData} from "./DtoConstant";

export interface OnReceivedPokerMessage {
    seat: number,
    number: number,
    cards: Array<PokerClientDto>,
}

// 阶段变化的电文
export interface OnFightLordLikePhaseMessage {
    phase: number,
    time: number,
}


// 加入房间的时候通知的房间信息
export interface OnRoomInfoMessage {
    roomId: number;
    master: string;
    password: number;
    maxPlayer: number;
    playerList: Array<RoomRoomPlayerClientData>;
}

// 玩家加入房间的通知信息
export interface OnPlayerJoinRoomMessage extends RoomRoomPlayerClientData {

}

export interface OnPlayerLeaveRoomMessage {
    uid: string,
}

export interface OnPlayerRoundMessage{

}

export interface OnPlayerPlayMessage{

}