import {UIWindow} from "../../UIFrame/UIForm";
import UIRunFastCreator_Auto from "../../AutoScripts/UIRunFastCreator_Auto";
import FormMgr from "../../UIFrame/FormMgr";
import UIConfig from "../../UIConfig";
import PokerGame from "../../Logic/Game/PokerGame";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UIRunFastCreator extends UIWindow {

    view: UIRunFastCreator_Auto;

    playerNumber = 2;
    roundTime = 30;

    start() {

    }

    createRoom() {
        const opts: CreateRunFastRoomOpts = {
            playerNumber: this.playerNumber,
            gameConfig: {
                roundTime: this.roundTime,
                perPlayerCards: 15,
                config: {}
            }
        }
        PokerGame.instance.roomController.createRoom({opts});
    }

    setPlayerNumber(e, params) {
        this.playerNumber = parseInt(params);
    }

    setRoundTime(e, params) {
        this.roundTime = parseInt(params);
    }


}
