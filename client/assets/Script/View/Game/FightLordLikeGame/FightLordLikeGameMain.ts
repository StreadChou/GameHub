import {AbstractGameMain} from "../AbstractGameMain";
import {BottomView} from "./Component/BottomView";
import {PlayerGameView} from "./Component/PlayerGameView";
import {SelfGameView} from "./Component/SelfGameView";
import {SelfRoomView} from "./Component/SelfRoomView";
import {OperateQueue, OperateQueueDescriptor} from "./OperateQueue";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FightLordLikeGameMain extends AbstractGameMain {
    static instance: FightLordLikeGameMain;
    public loaded: boolean = false;

    private _view: fgui.GComponent;

    // 子组件
    private bottomView: BottomView;
    private selfGameView: SelfGameView;
    private playerGameView: PlayerGameView;
    private selfRoomView: SelfRoomView;


    onLoad() {
        FightLordLikeGameMain.instance = this;
        // 底部信息:
        this.bottomView = new BottomView(this);
        // 我的出牌信息:
        this.selfGameView = new SelfGameView(this);
        // 我的房间操作
        this.selfRoomView = new SelfRoomView(this);
        // 玩家信息
        this.playerGameView = new PlayerGameView(this);

        fgui.UIPackage.loadPackage("UI/PokerGame", this.onUILoaded.bind(this));

    }

    protected update(dt: number) {
        if (!this.loaded) return;
        const item = OperateQueue.instance.shift();
        if (!item) return;
        item.operate(...item.args);
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/PokerGame");
        this._view = fgui.UIPackage.createObject("PokerGame", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this.bottomView.onUILoaded();
        this.selfGameView.onUILoaded();
        this.selfRoomView.onUILoaded();
        this.playerGameView.onUILoaded();

        this.loaded = true;

        // 常用组件赋值
        // this._handsPoker = new HandsPokerView(this._view);

        // const selfSeat = 1;
        // const roomPlayerNumber = 4;
        //
        // for (let i = 0; i < roomPlayerNumber; i++) {
        //     if (i == selfSeat) continue;
        //
        // }
        //
        // this._handsPoker.show();
        // const pokers = [
        //     {suit: 1, rank: 1,},
        //     {suit: 1, rank: 2,},
        //     {suit: 2, rank: 2,},
        //     {suit: 3, rank: 2,},
        //     {suit: 4, rank: 2,},
        //     {suit: 5, rank: 2,},
        //     {suit: 5, rank: 1,},
        // ];
        // this._handsPoker.onReceivePoker(pokers)
    }

    getChild(name: string) {
        return this._view.getChild(name);
    }

    @OperateQueueDescriptor()
    loadRoomInfo(roomId: number, password: number) {
        this.getChild("RoomId").asTextField.text = roomId.toString();
        this.getChild("Password").asTextField.text = password.toString();
    }

    // /**
    //  * 玩家加入房间
    //  */
    // onPlayerJoinRoom(player: RoomPlayerEntity, main: RoomPlayerEntity, room: RoomEntity) {
    //     const selfSeat = main.seat;
    //     const roomPlayerNumber = room.gameOption.maxPlayer;
    //     const pokerPlayerView = new PokerPlayerView(this._view, selfSeat, player.seat, roomPlayerNumber);
    //     this.playerSeatMap.push(pokerPlayerView);
    // }
    //
    // /**
    //  * 玩家离开房间
    //  */
    // onPlayerLeaveRoom(player: RoomPlayerEntity,) {
    //     const pokerPlayerView = this.playerSeatMap.deleteKey(player.seat);
    //     pokerPlayerView.destroy(); // 销毁
    // }
    //
    //


}
