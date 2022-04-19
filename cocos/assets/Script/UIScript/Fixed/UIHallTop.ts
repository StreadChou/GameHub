import {UIFixed} from "../../UIFrame/UIForm";
import AdapterMgr, {AdapterType} from "../../UIFrame/AdapterMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends UIFixed {


    start() {
        // AdapterMgr.inst.adapteByType(AdapterType.StretchWidth | AdapterType.StretchHeight, this.node);
    }

}
