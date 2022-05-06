export enum RequestOperation {
    RequestPlayPokers = "requestPlayPokers", // 出牌
    RequestPass = "requestPass", // 过
}

export enum PushOperation {
    OnPhase = "onPhase",
    OnReceivedPoker = "onReceivedPoker",
    OnPlayerRound = "onPlayerRound",
    OnPlayerPlay = "onPlayerPlay"
}