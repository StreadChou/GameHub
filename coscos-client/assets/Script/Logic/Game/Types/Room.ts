export enum GameType {

}

export enum ROOM_STATE {
    FREE,
    GAMING,
}

declare global {
    interface CreateRunFastRoomOpts {
        playerNumber: number;
        config: {}
    }
}