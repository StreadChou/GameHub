export enum Client2ServerCmd {
    GuestLogin = "connector.entryHandler.guestLogin",
    TokenLogin = "connector.entryHandler.accountLogin",


    CreateRoom = "room.roomHandler.createRoom",
    JoinRoom = "room.roomHandler.joinRoom",
    LeaveRoom = "room.roomHandler.leaveRoom",
    Ready = "room.roomHandler.Ready",
    StartGame = "room.roomHandler.startGame",

    GameOperate = "room.gameHandler.operate",
}

export enum RoomPushRoute {
    OnRoomInfo = "onRoomInfo",
    OnPlayerJoinRoom = "onPlayerJoinRoom",
    OnPlayerLeaveRoom = "onPlayerLeaveRoom",
}

export enum GamePushRoute {
    OnOperation = "onOperation",
}


export enum PlayerPushRoute {
    OnLogin = "onLogin",
}