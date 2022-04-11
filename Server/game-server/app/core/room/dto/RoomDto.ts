import {LEAVE_ROOM_REASON} from "../../../constant/Room";

export interface CreateRoomDto {

}

export interface PlayerJoinRoomDto {
    password: number;
}

export interface RoomPlayerInitDto {
    uid: string,
    nick: string,
    level: number
    money: number
    cover: string
    sid: number,
    fid: string,
}


declare global {
    interface NoticeRoomInfo {
        roomId: number;
        master: string;
        password: number;
        playerList: Array<playerClientData>;
    }

    interface playerClientData {
        uid: string,
        seat: number


        nick: string
        level: number
        money: number
        cover: string
        master: boolean,
    }

    // 离开房间给房间里所有人推送的电文
    interface NoticeLeaveRoomDto {
        uid: string,
        reason: LEAVE_ROOM_REASON,
    }
}