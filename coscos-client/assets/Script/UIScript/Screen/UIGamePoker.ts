import {UIScreen} from "../../UIFrame/UIForm";
import UIGamePoker_Auto from "../../AutoScripts/UIGamePoker_Auto";
import PokerGame from "../../Logic/Game/PokerGame";
import {Player} from "../../Logic/Player/Player";
import {FightLordLikeGame} from "../../Logic/GameT/FightLordLikeGame/FightLordLikeGame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIGamePoker extends UIScreen {
    public static inst: UIGamePoker = null;

    view: UIGamePoker_Auto;

    seatPosition = {
        "right": new cc.Vec2(607, -140),
        "right-top": new cc.Vec2(607, 30),
        "top": new cc.Vec2(-11, 228),
        "left-top": new cc.Vec2(-620, 96),
        "left": new cc.Vec2(-620, -140),
    }


    start() {
        UIGamePoker.inst = this;
    }

    onShow(params: CreateRunFastRoomOpts) {
        if (!PokerGame.instance.roomController.isMaster(Player.instance.uid)) {
            this.view.StartGame.node.active = false;
        }

        if (params.playerNumber) {

        }
    }

    addRole(role: cc.Node, position?: "right" | "right-top" | "top" | "left-top" | "left") {
        if (position) role.setPosition(this.seatPosition[position])
        this.node.addChild(role);
    }

    setRoomInfo(roomId: number, password: number) {
        this.view.RoomInfo.string = `房间号 :  ${roomId}  密码: ${password}`
    }

    startGame() {
        PokerGame.instance.roomController.startGame()
    }

    // 出牌
    playCard() {
        PokerGame.instance.gameController.playCard()
    }

    protected update(dt: number) {
        FightLordLikeGame.instance.update(dt)
    }

}
