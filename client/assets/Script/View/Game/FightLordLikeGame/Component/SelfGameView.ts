import FightLordLikeGameMain from "../FightLordLikeGameMain";

export class SelfGameView {
    static instance: SelfGameView;
    private father: FightLordLikeGameMain

    constructor(father: FightLordLikeGameMain) {
        SelfGameView.instance = this;
        this.father = father;
    }

    // 总视图
    private _view: fgui.GObject;

    onUILoaded() {
        this._view = this.father.getChild("SelfController");
    }
}