import {User} from "db://assets/Script/core/src/user/User";
import {RoomPlayerManager} from "db://assets/Script/app/room/RoomPlayerManager";

export interface RoomPlayer {
    uid: string,
    master: boolean,
    seat: number;
    index?: number;
}

export class Room {
    private static _instance: Room;
    private roomPlayerManager: RoomPlayerManager
    roomId: number = 0;
    master: string = "";
    password: number = 0;
    maxPlayer: number = 3;

    playerSeatMap: { [key in number]: RoomPlayer } = {};
    playerUidMap: { [key in string]: RoomPlayer } = {}
    seat: number;

    private constructor(onRoomInfoData?: any) {
        if (onRoomInfoData) {
            Object.assign(this, onRoomInfoData);
            onRoomInfoData.playerList.forEach(ele => {
                this.playerSeatMap[ele.seat] = ele;
                this.playerUidMap[ele.uid] = ele;
            })
        }
    }

    public static getInstance(onRoomInfoData?: any) {
        this._instance = this._instance ?? new Room(onRoomInfoData)
        return this._instance;
    }

    public static destroy() {
        this._instance = null;
    }

    setRoomPlayerManager(roomPlayerManager: RoomPlayerManager) {
        this.roomPlayerManager = roomPlayerManager;
        console.error("setRoomPlayerManager", this.roomPlayerManager)
    }

    public onPlayerJoinRoom(data: RoomPlayer) {
        const my = User.getInstance();
        if (my.uid == data.uid) {
            this.seat = data.seat;
        }
        this.playerSeatMap[data.seat] = data;
        this.playerUidMap[data.uid] = data;

        console.error(data)
        if (this.roomPlayerManager) {
            console.error(this.roomPlayerManager)
            this.roomPlayerManager.reseatPlayerSeat(data);
        }
    }

}