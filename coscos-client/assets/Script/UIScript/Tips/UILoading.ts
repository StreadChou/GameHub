import {UITips} from "../../UIFrame/UIForm";
import AdapterMgr from "../../UIFrame/AdapterMgr";
import UILoading_Auto from "../../AutoScripts/UILoading_Auto";
import CocosHelper from "../../UIFrame/CocosHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILoading extends UITips {
    public willDestory: boolean = false;

    view: UILoading_Auto;

    start() {

    }

    async showEffect() {
        const halfWidth = AdapterMgr.inst.visibleSize.width / 2
        const childWidth = this.view.Left.width;
        let len = halfWidth + childWidth / 2;
        this.view.Left.x = -len;
        this.view.Right.x = len;

        await Promise.all([
            CocosHelper.runTweenSync(this.view.Left, cc.tween().to(0.3, {x: -(childWidth / 2)}, cc.easeIn(3.0))),
            CocosHelper.runTweenSync(this.view.Right, cc.tween().to(0.3, {x: childWidth / 2}, cc.easeIn(3.0)))
        ]);
    }

    async hideEffect() {
        const halfWidth = AdapterMgr.inst.visibleSize.width / 2
        const childWidth = this.view.Left.width;
        let len = halfWidth + childWidth / 2;
        this.view.Left.x = -(childWidth / 2);
        this.view.Right.x = childWidth / 2;

        await CocosHelper.sleepSync(0.5);
        await Promise.all([
            CocosHelper.runTweenSync(this.view.Left, cc.tween().to(0.3, {x: -len}, cc.easeIn(3.0))),
            CocosHelper.runTweenSync(this.view.Right, cc.tween().to(0.3, {x: len}, cc.easeIn(3.0)))
        ]);
    }
}
