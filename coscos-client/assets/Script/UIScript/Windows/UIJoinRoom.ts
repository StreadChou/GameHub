import {UIWindow} from "../../UIFrame/UIForm";
import UIJoinRoom_Auto from "../../AutoScripts/UIJoinRoom_Auto";
import Game = cc.Game;
import PokerGame from "../../Logic/Game/PokerGame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIJoinRoom extends UIWindow {

    view: UIJoinRoom_Auto;

    start() {

    }

    JoinRoom(){
        const roomId = this.view.RoomId.string;
        console.log(roomId);
        const password = this.view.Password.string;
        PokerGame.instance.roomController.joinRoom(parseInt(roomId));
    }

}
