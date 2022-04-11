// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {UITips} from "../../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIError extends UITips {

    public willDestory: boolean = false;

    start () {

    }

    onShow(str: string) {
        // this.view.Message.string = str;
        // setTimeout(()=>{
        //     this.closeSelf();
        // }, 0.5 * 1000)
    }

    showTips(str: string) {
        console.log(str);
        // this.view.StringTip.string = str;
    }


}
