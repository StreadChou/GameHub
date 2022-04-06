export enum RoomPushRoute {
    OnRoomInfo = "onRoomInfo",
    OnPlayerJoinRoom = "onPlayerJoinRoom",
    OnPlayerLeaveRoom = "onPlayerLeaveRoom",
}

export enum GamePushRoute {
    OnReceivedPoker = "onReceivedPoker",
}

export enum LookDespairGameRoute {
    LookDespairGameStart = "lookDespairGameStart", // 游戏开始
    LookDespairReceivedPoker = "lookDespairReceivedPoker", // 收到牌
}

export enum PlayerPushRoute {
    OnLogin = "onLogin",
}