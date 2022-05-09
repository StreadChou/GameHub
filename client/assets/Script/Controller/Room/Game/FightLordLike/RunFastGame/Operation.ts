export enum RequestOperation {
    RequestPlayPokers = "requestPlayPokers", // 出牌
    RequestNotice = "requestNotice", // 提示
    RequestPass = "requestPass", // 过
}

export enum PushOperation {
    OnPhase = "onPhase",
    OnReceivedPoker = "onReceivedPoker",
    OnPlayerRound = "onPlayerRound",
    OnPlayerPlay = "onPlayerPlay",
    OnPlayerPass = "onPlayerPass",
}