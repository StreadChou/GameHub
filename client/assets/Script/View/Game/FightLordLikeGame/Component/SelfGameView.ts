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

    onGameOver() {
        SelfGameView.instance = undefined;
    }

    // 总视图
    private _view: fgui.GObject;

    private handsArea: fgui.GList;
    private foldArea: fgui.GList;
    private timer: fgui.GButton;
    private timerInterval: number;
    private operateArea: fgui.GObject;
    private noticeTxt: fgui.GObject;
    private noticeArray: Array<Array<{ suit: number, rank: number }>> = undefined
    private noticeIndex: number = 0;

    onUILoaded() {

        this._view = this.father.getChild("SelfController");
        this.handsArea = this._view.asCom.getChild("HandsArea").asList;
        this.foldArea = this._view.asCom.getChild("FoldArea").asList;
        this.timer = this._view.asCom.getChild("Timer").asButton;
        this.operateArea = this._view.asCom.getChild("operate");
        this.noticeTxt = this._view.asCom.getChild("NoticeTxt");

        this._view.asCom.getChild("PlayPoker").onClick(() => {
            ControllerRunFast.getInstance().requestOperation(RequestOperation.RequestPlayPokers, {pokers: this.getAllSelectCard()});
        })
        this._view.asCom.getChild("Notice").onClick(() => {
            if (!this.noticeArray) {
                ControllerRunFast.getInstance().requestOperation(RequestOperation.RequestNotice, {});
            } else {
                this.noticeIndex++;
                if (this.noticeIndex > this.noticeArray.length - 1) this.noticeIndex = 0;
                this.onNoticePoker();
            }
        })
        this._view.asCom.getChild("Pass").onClick(() => {
            ControllerRunFast.getInstance().requestOperation(RequestOperation.RequestPass, {});
        })

        fgui.UIObjectFactory.setExtension("ui://PokerGame/HandsPokerItem", HandsPokerItem);
        fgui.UIObjectFactory.setExtension("ui://PokerGame/FoldPokerItem", FoldPokerItem);
    }

    reloadAllGameView() {
        this.foldArea.visible = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timer.visible = false;
        this.operateArea.visible = false;

        this.noticeTxt.visible = false;
        this.noticeTxt.asTextField.text = "";
    }

    @OperateQueueDescriptor()
    // 当点击了提醒之后
    onNoticePoker(noticeArray?: Array<Array<{ suit: number, rank: number }>>) {
        if (noticeArray) this.noticeArray = noticeArray;
        const pokers = this.noticeArray[this.noticeIndex];
        if (!pokers) {
            // TODO 没有牌打过上家
            return undefined;
        }
        this.handsArea.asList._children.forEach(ele => ele.asButton.selected = false);
        pokers.forEach(poker => {
            // 查找没有选中的等值的牌
            const _po = this.handsArea.asList._children.find((handsPoker: HandsPokerItem) => !handsPoker.asButton.selected && handsPoker.suit == poker.suit && handsPoker.rank == poker.rank)
            _po.asButton.selected = true;
        })
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
    // 当我的回合开始的时候
    onRoundStart(time: number, newRound: boolean) {
        this.noticeArray = undefined;
        this.noticeIndex = 0;
        this.noticeTxt.visible = false;
        this.operateArea.visible = true;
        this.timer.asCom.visible = true;
        this.timer.asButton.title = time.toString();
        this.timerInterval = setInterval(() => {
            if (time <= 0) {
                clearInterval(this.timerInterval);
                this.timer.asCom.visible = false;
            }
            time--;
            this.timer.asButton.title = time.toString();
        }, 1000)

        this.foldArea.removeChildrenToPool();

        const passButton = this._view.asCom.getChild("Notice");
        const noticeButton = this._view.asCom.getChild("Pass");
        if (newRound) {
            passButton.visible = false;
            noticeButton.visible = false;
        } else {
            passButton.visible = true;
            noticeButton.visible = true;
        }
    }


    @OperateQueueDescriptor()
    // 当进入别人的回合
    onOtherRound() {
        this.operateArea.visible = false;
        this.timer.asCom.visible = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
    }

    @OperateQueueDescriptor()
    // 当我出牌的时候
    onFoldPoker(pokers: Array<{ rank: number, suit: number }>) {
        this.foldArea.visible = true;
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

    @OperateQueueDescriptor()
    // 当我出牌的时候
    onPlayerPass() {
        this.foldArea.visible = false;

        const noticeNode = this.noticeTxt.asTextField;
        noticeNode.text = "要不起!";
        noticeNode.visible = true;
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