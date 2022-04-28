// 从 connector到logic登录的结构
export interface PlayerLoginRequestDto {
    aid: number,
    nick: string,
    cover: string,
}

export interface PlayerLoginResponseDto {
    logicServerId: string,
    uid: string,
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