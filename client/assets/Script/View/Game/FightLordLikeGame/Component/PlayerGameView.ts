import FightLordLikeGameMain from "../FightLordLikeGameMain";
import {RoomPlayerEntity} from "../../../../Model/RoomServices";
import {OperateQueueDescriptor} from "../OperateQueue";

type PlayerItem = { view: fgui.GObject, player: RoomPlayerEntity };

export class PlayerGameView {
    static instance: PlayerGameView;
    private father: FightLordLikeGameMain

    constructor(father: FightLordLikeGameMain) {
        PlayerGameView.instance = this;
        this.father = father;
    }

    // 总视图
    private _view: fgui.GObject;

    private leftPlayerView: fgui.GObject;
    private topPlayerView: fgui.GObject;
    private rightPlayerView: fgui.GObject;
    private seatToView: { [key in number]: PlayerItem } = {};

    onUILoaded() {
        this._view = this.father.getChild("PlayerController");
        this.leftPlayerView = this._view.asCom.getChild("left");
        this.leftPlayerView.asCom.getTransition("LeftView").play();

        this.topPlayerView = this._view.asCom.getChild("top");
        this.topPlayerView.asCom.getTransition("TopView").play();

        this.rightPlayerView = this._view.asCom.getChild("right");
        this.rightPlayerView.asCom.getTransition("RightView").play();
    }

    @OperateQueueDescriptor()
    loadPlayer(maxNumber: number, targetSeat: number, mainSeat: number, player: RoomPlayerEntity) {
        this.setPlayerSeatToView(maxNumber, targetSeat, mainSeat, player);
        const playerItem = this.getPlayerViewItem(targetSeat);

        // 刷新玩家身上的数据, 以及展示或者隐藏
        this.reloadPlayerInfo(playerItem);
    }

    @OperateQueueDescriptor()
    setReady(targetSeat: number) {
        const item = this.getPlayerViewItem(targetSeat);
        if (item.player.ready) {
            item.view.asCom.getChild("ReadyText").asTextField.text = "准备";
            item.view.asCom.getChild("ReadyText").visible = true;
        } else {
            item.view.asCom.getChild("ReadyText").visible = false;
        }
    }

    @OperateQueueDescriptor()
    onGameStart() {
        Object.values(this.seatToView).forEach((item) => {
            item.view.asCom.getChild("ReadyText").visible = false; // 隐藏准备按钮
        })
    }

    @OperateQueueDescriptor()
    onEnterPlayerRound(seat: number, time: number) {
        Object.keys(this.seatToView).forEach((eleSeat) => {
            const item: PlayerItem = this.seatToView[eleSeat];
            const timer = item.view.asCom.getChild("Timer");
            timer.asButton.title = time.toString();
            if (parseInt(eleSeat) == seat) {
                timer.visible = true;
            } else {
                timer.visible = false;
            }
        })

    }

    protected reloadPlayerInfo(item: PlayerItem) {
        if (!item.player || item.player.seat === undefined || item.player.seat === null) return item.view.visible = false;
        item.view.asCom.getChild("Cover").asButton.icon = item.player.cover;
        item.view.asCom.getChild("NickName").asTextField.text = item.player.nick;
        item.view.asCom.getChild("Gold").asTextField.text = item.player.money.toString();

        return item.view.visible = true;
    }

    protected getPlayerViewItem(seat: number): PlayerItem {
        return this.seatToView[seat];
    }

    protected setPlayerSeatToView(maxNumber: number, targetSeat: number, mainSeat: number, player: RoomPlayerEntity) {
        if (maxNumber == 2) {
            this.seatToView[targetSeat] = {view: this.topPlayerView, player};
        }

        let index = targetSeat - mainSeat;
        if (index <= 0) index += maxNumber;

        if (maxNumber == 3) {
            switch (index) {
                case 1:
                    this.seatToView[targetSeat] = {view: this.rightPlayerView, player};
                    break;
                case 2:
                    this.seatToView[targetSeat] = {view: this.leftPlayerView, player};
                    break;
            }
        }

        if (maxNumber == 4) {
            switch (index) {
                case 1:
                    this.seatToView[targetSeat] = {view: this.rightPlayerView, player};
                    break;
                case 2:
                    this.seatToView[targetSeat] = {view: this.topPlayerView, player};
                    break;
                case 3:
                    this.seatToView[targetSeat] = {view: this.leftPlayerView, player};
                    break;
            }
        }
    }
}