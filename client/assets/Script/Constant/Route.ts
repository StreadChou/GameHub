export enum Client2ServerCmd {
    GuestLogin = "connector.entryHandler.guestLogin",
    TokenLogin = "connector.entryHandler.accountLogin",


    CreateRoom = "room.roomHandler.createRoom",
    JoinRoom = "room.roomHandler.joinRoom",
    LeaveRoom = "room.roomHandler.leaveRoom",
    StartGame = "room.roomHandler.startGame",
    GameEvent = "room.gameHandler.gameEvent",
}

export enum RoomPushRoute {
    OnRoomInfo = "onRoomInfo",
    OnPlayerJoinRoom = "onPlayerJoinRoom",
    OnPlayerLeaveRoom = "onPlayerLeaveRoom",
}

export enum GamePushRoute {
    OnFightLordLikePhase = "onFightLordLikePhase",
    OnReceivedPoker = "onReceivedPoker",
    OnPlayerRound = "onPlayerRound",
    OnPlayerPlay = "onPlayerPlay"
}


export enum PlayerPushRoute {
    OnLogin = "onLogin",
}