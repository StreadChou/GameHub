import {UIWindow} from "../../UIFrame/UIForm";
import UIRunFastCreator_Auto from "../../AutoScripts/UIRunFastCreator_Auto";
import FormMgr from "../../UIFrame/FormMgr";
import UIConfig from "../../UIConfig";
import PokerGame from "../../Logic/Game/PokerGame";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIRunFastCreator extends UIWindow {

    view: UIRunFastCreator_Auto;

    start() {

    }

    createRoom() {
        const opts: CreateRunFastRoomOpts = {
            playerNumber: 2,
            config: {}
        }
        PokerGame.instance.roomController.createRoom();
    }


}
