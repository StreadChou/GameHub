import {UIScreen} from "../../UIFrame/UIForm";
import UIGamePoker_Auto from "../../AutoScripts/UIGamePoker_Auto";
import PokerGame from "../../Logic/Game/PokerGame";
import {Player} from "../../Logic/Player/Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIGamePoker extends UIScreen {
    public static inst: UIGamePoker = null;

    view: UIGamePoker_Auto;


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

    addRole(role: cc.Node) {
        this.node.addChild(role);
    }

    setRoomInfo(roomId: number, password: number) {
        this.view.RoomInfo.string = `房间号 :  ${roomId}  密码: ${password}`
    }

}
