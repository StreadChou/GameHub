import {RoomServices} from "../../Model/RoomServices";
import {AbstractRoomOption, GameTypeEnum} from "../../Constant/Game";
import {ControllerRunFast} from "./Game/FightLordLike/RunFastGame/ControllerRunFast";
import {AbstractGameController} from "./Game/AbstractGameController";

// 房间控制器,
// 所有房间的电文只影响数据,  房间控制器需要告知view什么时候刷新界面
export class ControllerRoom {
    private static _instance;
    private game: AbstractGameController;


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
        const gameType = RoomServices.room.gameOption.gameTypeEnum;
        switch (gameType) {
            case GameTypeEnum.FightLordLike:
                this.game = ControllerRunFast.getInstance()
                return this.game.onEnterRoom();
        }
    }

    // 重新加载房间内的玩家
    reloadPlayer() {
        return this.game.reloadPlayer();
    }

    GameOnPushOperation = (operation: string, data: any) => this.game.onPushOperation(operation, data);


}