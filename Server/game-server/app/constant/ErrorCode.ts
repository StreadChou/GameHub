export enum ErrorCode {
    Success = 200,
    CommonError = 500,

    // 用户自操作相关
    LoginTokenCheckError = 10000,
    LoginError,

    // 房间相关
    RoomNotExist = 20000,
    RoomFull,
    NotInRoom,
    NotRoomMaster,
    CantKickVipPlayer,
    AlreadyInRoom,
    PasswordError,
    GameConfigError,

    // 游戏相关
    GameNotExist = 30000, // 游戏还没有开始, 没有对实例化出来
    RoleNotInGame, // 玩家不再game中
    IllegalOperation, // 非法的操作
    NotRoleRound, // 不是玩家的回合
    PokerIllegal, // 出牌不合法
    PokerLessThanLast, // 牌比上家小
}