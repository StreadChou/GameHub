import {UIScreen} from "../../UIFrame/UIForm";
import AdapterMgr, {AdapterType} from "../../UIFrame/AdapterMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIScreen {


    start() {
        AdapterMgr.inst.adapteByType(AdapterType.StretchHeight | AdapterType.StretchWidth, this.node);
    }
}
