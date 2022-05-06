import FightLordLikeGameMain from "../FightLordLikeGameMain";
import {OnReceivedPoker} from "../../../../Controller/Room/Game/FightLordLike/RunFastGame/operation/OnReceivedPoker";
import {OperateQueueDescriptor} from "../OperateQueue";
import HandsPokerItem from "../Item/HandsPokerItem";

export class SelfGameView {
    static instance: SelfGameView;
    private father: FightLordLikeGameMain

    constructor(father: FightLordLikeGameMain) {
        SelfGameView.instance = this;
        this.father = father;
    }

    // 总视图
    private _view: fgui.GObject;

    private handsArea: fgui.GList;
    private foldArea: fgui.GList;
    private timer: fgui.GButton;
    private operateArea: fgui.GObject;

    onUILoaded() {

        this._view = this.father.getChild("SelfController");
        this.handsArea = this._view.asCom.getChild("HandsArea").asList;
        this.foldArea = this._view.asCom.getChild("FoldArea").asList;
        this.timer = this._view.asCom.getChild("Timer").asButton;
        this.operateArea = this._view.asCom.getChild("operate");
        this._view.asCom.getChild("PlayPoker").onClick(() => {

        })
        this._view.asCom.getChild("Notice").onClick(() => {

        })
        this._view.asCom.getChild("Pass").onClick(() => {

        })

        fgui.UIObjectFactory.setExtension("ui://PokerGame/HandsPokerItem", HandsPokerItem);
    }

    @OperateQueueDescriptor()
    // 当收到卡牌之后
    onReceivedPoker(pokers: Array<{ rank: number, suit: number }>) {
        this.handsArea.asCom.visible = true;
        pokers.forEach(ele => {
            let item: HandsPokerItem = <HandsPokerItem>this.handsArea.addItemFromPool();
            item.setPoker(ele);
            item.useFont();
        })
        this.handsArea.ensureBoundsCorrect();


        let delay: number = 0;
        for (let item of this.handsArea._children as Array<HandsPokerItem>) {
            if (this.handsArea.isChildInView(item)) {
                item.playEffect(delay);
                delay += 0.2;
            } else
                break;
        }
    }

    @OperateQueueDescriptor()
    // 当回合开始的时候
    onRoundStart(time: number) {
        this.operateArea.visible = true;
        this.timer.asCom.visible = true;
        this.timer.asButton.title = time.toString();
    }

    @OperateQueueDescriptor()
    // 当进入别人的回合
    onOtherRound() {
        this.operateArea.visible = false;
        this.timer.asCom.visible = false;
    }

}