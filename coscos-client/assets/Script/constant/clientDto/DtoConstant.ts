// 和客户端沟通用的扑克结构体

import {PokerSuit} from "../poker";

export interface PokerClientDto {
    suit: PokerSuit // 扑克的花色
    rank: number // 扑克的大小
    value?: number // 扑克的唯一value值
    name?: string // 扑克的中文名字
}

//  房间内的玩家的信息
export interface RoomRoomPlayerClientData {
    uid: string,
    seat: number
    nick: string
    level: number
    money: number
    cover: string
}