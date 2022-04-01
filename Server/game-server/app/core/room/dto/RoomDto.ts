import {LEAVE_ROOM_REASON} from "../../../constant/Room";

export interface CreateRoomDto {

}

export interface PlayerJoinRoomDto {
    password: string;
}

export interface RoomPlayerInitDto {
    uid: string,
    nick: string,
}


// 离开房间给房间里所有人推送的电文
export interface NoticeJoinRoomDto {

}

// 离开房间给房间里所有人推送的电文
export interface NoticeLeaveRoomDto {
    uid: string,
    reason: LEAVE_ROOM_REASON,
}