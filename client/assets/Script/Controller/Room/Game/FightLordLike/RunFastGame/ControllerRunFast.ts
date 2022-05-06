import {AbstractGameController} from "../../AbstractGameController";
import Hall from "../../../../../View/Hall/Hall";
import FightLordLikeGameMain from "../../../../../View/Game/FightLordLikeGame/FightLordLikeGameMain";
import Entry from "../../../../../Entry";
import {EventSystem} from "../../../../../Event/EventSystem";
import {EVENT} from "../../../../../Event/EventDefine";
import {RoomEntity, RoomServices} from "../../../../../Model/RoomServices";
import {UserEntity, UserServices} from "../../../../../Model/UserServices";
import {SelfRoomView} from "../../../../../View/Game/FightLordLikeGame/Component/SelfRoomView";
import {BottomView} from "../../../../../View/Game/FightLordLikeGame/Component/BottomView";

export class ControllerRunFast extends AbstractGameController {
    private static _instance;
    private room: RoomEntity;
    private user: UserEntity;
    private view: FightLordLikeGameMain


    public static getInstance(): ControllerRunFast {
        this._instance = this._instance ?? new ControllerRunFast();
        return this._instance;
    }

    get isMaster(): boolean {
        return this.user.uid == this.room.master;
    }

    onEnterRoom() {
        // 切换场景
        Entry.instance.changeScenes(FightLordLikeGameMain)

        this.view = FightLordLikeGameMain.instance;
        this.room = RoomServices.room;
        this.user = UserServices.user;


        FightLordLikeGameMain.instance.loadRoomInfo(this.room.roomId, this.room.password); // 显示房间信息
        BottomView.instance.showBottomUserInfo(this.user.cover, this.user.nick, this.user.money, this.user.money); // 底部的用户信息
        SelfRoomView.instance.refreshInfo(false, false, false); // 房间操作, 开始游戏还是准备
    }

    // 玩家准备
    playerReady() {

    }

    // 开始游戏
    startGame() {

    }

    // 离开房间
    leaveRoom() {

    }


}