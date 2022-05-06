import FightLordLikeGameMain from "../FightLordLikeGameMain";
import {OperateQueueDescriptor} from "../OperateQueue";
import HandsPokerItem from "../Item/HandsPokerItem";
import {ControllerRunFast} from "../../../../Controller/Room/Game/FightLordLike/RunFastGame/ControllerRunFast";
import {RequestOperation} from "../../../../Controller/Room/Game/FightLordLike/RunFastGame/Operation";
import FoldPokerItem from "../Item/foldPokerItem";

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
            ControllerRunFast.getInstance().requestOperation(RequestOperation.RequestPlayPokers, {pokers: this.getAllSelectCard()});
        })
        this._view.asCom.getChild("Notice").onClick(() => {

        })
        this._view.asCom.getChild("Pass").onClick(() => {

        })

        fgui.UIObjectFactory.setExtension("ui://PokerGame/HandsPokerItem", HandsPokerItem);
        fgui.UIObjectFactory.setExtension("ui://PokerGame/FoldPokerItem", FoldPokerItem);
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

    @OperateQueueDescriptor()
    // 当我出牌的时候
    onFoldPoker(pokers: Array<{ rank: number, suit: number }>) {
        this.foldArea.visible = true;
        this.foldArea.asCom.visible = true;
        pokers.sort((eleA, eleB) => eleB.rank - eleA.rank).forEach(ele => {
            let item: HandsPokerItem = <HandsPokerItem>this.foldArea.addItemFromPool();
            item.setPoker(ele);
            item.useFont();
        })
        this.foldArea.ensureBoundsCorrect();

        pokers.forEach((ele) => {
            const item = this.handsArea._children.find((handsPokerItem: HandsPokerItem) => handsPokerItem.rank == ele.rank && handsPokerItem.suit == ele.suit);
            this.handsArea.removeChild(item);
        })
        this.handsArea.ensureBoundsCorrect();
    }

    // 获取所有选中的牌
    getAllSelectCard() {
        const pokers: Array<{ rank: number, suit: number }> = [];
        this.handsArea._children.forEach((ele: HandsPokerItem) => {
            if (ele.selected) pokers.push({rank: ele.rank, suit: ele.suit});
        })
        return pokers
    }

}