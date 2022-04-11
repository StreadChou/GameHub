export enum GAME_CMD {
    RequestRoomCreate = "room.roomHandler.createRoom",
    RequestJoinRoom = "room.roomHandler.joinRoom",
    RequestLeaveRoom = "room.roomHandler.leaveRoom",
    RequestStartGame = "room.roomHandler.startGame",
    RequestPokerGamePlay = "room.gameHandler.play",

    OnRoomInfo = "onRoomInfo",
    OnPlayerJoinRoom = "onPlayerJoinRoom",
    OnPlayerLeaveRoom = "onPlayerLeaveRoom",

    OnPhase = "onPhase",
    OnReceivedPoker = "onReceivedPoker",
    OnPlayerRound = "onPlayerRound",
    OnPlayerPlay = "onPlayerPlay"
}