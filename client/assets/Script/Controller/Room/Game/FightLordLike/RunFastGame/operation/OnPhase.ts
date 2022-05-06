import {SelfRoomView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfRoomView";

export enum GameState {
    Init,  // 开始阶段
    Start, // 初始化阶段
    Deal, // 发牌阶段
    Round, // 打牌阶段
    GameOver, // 结束阶段, 结算阶段
}

export class OnPhase {
    running(data: { phase: GameState, time: number, data: any }) {
        const phase: GameState = data.phase;
        switch (phase) {
            case GameState.Start:
                return this.onPhaseStart(data);

        }
    }

    onPhaseStart(data: { phase: GameState, time: number, data: any }) {
        // 开始阶段, 隐藏操作按钮
        SelfRoomView.instance.refreshInfo(true);
    }


}