import {AbstractGameController} from "../../AbstractGameController";
import FightLordLikeGameMain from "../../../../../View/Game/FightLordLikeGame/FightLordLikeGameMain";
import Entry from "../../../../../Entry";
import {RoomEntity, RoomServices} from "../../../../../Model/RoomServices";
import {UserEntity, UserServices} from "../../../../../Model/UserServices";
import {SelfRoomView} from "../../../../../View/Game/FightLordLikeGame/Component/SelfRoomView";
import {BottomView} from "../../../../../View/Game/FightLordLikeGame/Component/BottomView";
import {PlayerGameView} from "../../../../../View/Game/FightLordLikeGame/Component/PlayerGameView";
import {RoomState} from "../../../../../Constant/Room";
import {PushOperation} from "./Operation";
import {OperationPushFactory} from "./OperationFactory";

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

    // 场景加载
    onEnterRoom() {
        // 切换场景
        Entry.instance.changeScenes(FightLordLikeGameMain)
        this.view = FightLordLikeGameMain.instance;
        this.room = RoomServices.room;
        this.user = UserServices.user;

        this.reloadRoomView();
    }

    // 重新加载房间基本信息, 是显示开始游戏还是准备
    reloadRoomView() {
        // 显示房间信息 顶部的房间号和密码
        FightLordLikeGameMain.instance.loadRoomInfo(this.room.roomId, this.room.password);

        // 底部的用户信息, 名字和钱等
        BottomView.instance.showBottomUserInfo(this.user.cover, this.user.nick, this.user.money, this.user.money);

        // 房间操作, 是显示开始游戏还是准备
        const notRoomState = [RoomState.Match, RoomState.Gaming].includes(this.room.state);
        const main = this.room.getUserByUid(this.user.uid);
        SelfRoomView.instance.refreshInfo(notRoomState, this.isMaster, main.ready);
    }

    // 重新加载房间玩家
    reloadPlayer() {
        const maxPlayer = this.room.gameOption.maxPlayer;
        const main = this.room.getUserByUid(this.user.uid);

        for (let seat = 0; seat < maxPlayer; seat++) {
            if (main.seat == seat) continue;
            const player = this.room.getPlayerBySeat(seat);
            PlayerGameView.instance.loadPlayer(this.room.gameOption.maxPlayer, seat, main.seat, player);
        }
    }


    onPushOperation(operation: PushOperation, data: any) {
        const operator = OperationPushFactory(operation);
        if (operator) operator.running(data);
    }

}