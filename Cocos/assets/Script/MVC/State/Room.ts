export class Room {
    private static _instance: Room;

    private constructor() {
        // 单例
    }

    public static get instance(): Room {
        this._instance = this._instance ?? new Room();
        return this._instance;
    }
}


export class RoomPlayer {
    constructor(info: any) {
    }
}