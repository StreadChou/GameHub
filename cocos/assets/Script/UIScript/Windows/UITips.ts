import {UIWindow} from "../../UIFrame/UIForm";
import {ModalOpacity} from "../../UIFrame/config/SysDefine";
import {ModalType} from "../../UIFrame/Struct";
import UITips_Auto from "../../AutoScripts/UITips_Auto";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UITips extends UIWindow {

    modalType = new ModalType(ModalOpacity.OpacityHalf, true);

    view: UITips_Auto;


    // onLoad () {}

    start() {

    }

    onShow(str: string) {
        this.view.Tips.string = str;
    }

    // update (dt) {}
}
