import {RoomServices} from "../../Model/RoomServices";
import {AbstractRoomOption, GameTypeEnum} from "../../Constant/Game";
import {ControllerRunFast} from "./Game/FightLordLike/RunFastGame/ControllerRunFast";

// 房间控制器,
// 所有房间的电文只影响数据,  房间控制器需要告知view什么时候刷新界面
export class ControllerRoom {
    private static _instance;


    public static getInstance(): ControllerRoom {
        this._instance = this._instance ?? new ControllerRoom();
        return this._instance;
    }

    createRoom(options: any) {
        RoomServices.instance.requestCreateRoom(options)
    }

    joinRoom(options: any) {
        RoomServices.instance.requestJoinRoom(options)
    }


    // 加入房间成功
    onJoinRoomSuccess() {
        console.error(RoomServices.room)
        const gameType = RoomServices.room.gameOption.gameTypeEnum;
        switch (gameType) {
            case GameTypeEnum.FightLordLike:
                return ControllerRunFast.getInstance().onEnterRoom();

        }
    }


    // 进入房间之后
    onRoom() {
        // TODO 界面切换到Load,
        // TODO 加载game.
        // TODO 关掉load, 切换场景
    }

    // 有玩家加入
    onRoomPlayer() {
        //
    }

    // 根据数据恢复场景
    recoverView() {
        const roomInfo = {}
    }


}