import FightLordLikeGameMain from "../FightLordLikeGameMain";
import {OperateQueueDescriptor} from "../OperateQueue";

export class BottomView {
    static instance: BottomView;
    private father: FightLordLikeGameMain

    constructor(father: FightLordLikeGameMain) {
        BottomView.instance = this;
        this.father = father;
    }

    // 总视图
    private _view: fgui.GObject;

    onUILoaded() {
        this._view = this.father.getChild("BottomInfo");
    }


    @OperateQueueDescriptor()
    showBottomUserInfo(cover: string, nick: string, gold: number, money: number) {
        const CoverNode = this._view.asCom.getChild("Cover").asButton;
        CoverNode.icon = cover;

        const NickNameNode = this._view.asCom.getChild("NickName").asTextField;
        NickNameNode.text = nick;

        const GoldNode = this._view.asCom.getChild("Gold").asButton;
        GoldNode.title = gold.toString()

        const MoneyNode = this._view.asCom.getChild("Money").asButton;
        MoneyNode.title = money.toString();
    }


    @OperateQueueDescriptor()
    showBottomButtonInfo() {

    }


}