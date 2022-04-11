import {UIScreen} from "../../UIFrame/UIForm";
import FormMgr from "../../UIFrame/FormMgr";
import UIConfig from "../../UIConfig";
import UIHall_Auto from "../../AutoScripts/UIHall_Auto";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIScreen {

    view: UIHall_Auto;

    start() {
    }

    openCreator(e: cc.Event.EventTouch, params: string) {
        let node = e.getCurrentTarget();
        switch (node.name) {
            case "RunFastButton":
                return FormMgr.open(UIConfig.UIRunFastCreator)
            default:
                return FormMgr.open(UIConfig.UINotice, "功能还在开发中!")
        }
    }

    JoinRoom(e: cc.Event.EventTouch, params: string){
        FormMgr.open(UIConfig.UIJoinRoom)
    }

}
