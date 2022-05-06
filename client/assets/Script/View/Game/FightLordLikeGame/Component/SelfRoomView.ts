import FightLordLikeGameMain from "../FightLordLikeGameMain";
import {ControllerRunFast} from "../../../../Controller/Room/Game/FightLordLike/RunFastGame/ControllerRunFast";
import {OperateQueueDescriptor} from "../OperateQueue";
import {RoomServices} from "../../../../Model/RoomServices";

export class SelfRoomView {
    static instance: SelfRoomView;
    private father: FightLordLikeGameMain

    constructor(father: FightLordLikeGameMain) {
        SelfRoomView.instance = this;
        this.father = father;
    }


    // 总视图
    private _view: fgui.GObject;

    // 常用的子元素
    children: {
        startGameButton: fgui.GObject;
        readyButton: fgui.GObject;
        leaveRoomButton: fgui.GObject;
    }

    onUILoaded() {
        this._view = this.father.getChild("RoomController");
        this.children = {
            startGameButton: this._view.asCom.getChild("StartGameButton"),
            readyButton: this._view.asCom.getChild("ReadyButton"),
            leaveRoomButton: this._view.asCom.getChild("LeaveRoomButton"),
        }
    }

    @OperateQueueDescriptor()
    refreshInfo(notRoomState: boolean, isMaster?: boolean, ready?: boolean) {
        // 如果游戏已经开始, 则强制不显示
        if (notRoomState) {
            return this._view.visible = false;
        }

        // 如果是房主, 则显示开始游戏, 否则显示准备按钮
        this.children.startGameButton.visible = isMaster;
        this.children.readyButton.visible = !isMaster;
        this.children.readyButton.asButton.title = ready ? "取消准备" : "准备"

        this.children.readyButton.asButton.onClick(() => {
            RoomServices.instance.requestReady({});
        })

        this.children.startGameButton.asButton.onClick(() => {
            RoomServices.instance.requestStartGame({});
        })

        this.children.leaveRoomButton.asButton.onClick(() => {
            RoomServices.instance.requestStartGame({});
        })

        return this._view.visible = true;
    }
}