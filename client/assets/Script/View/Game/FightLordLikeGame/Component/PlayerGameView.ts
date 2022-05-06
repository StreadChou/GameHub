import FightLordLikeGameMain from "../FightLordLikeGameMain";

export class PlayerGameView {
    static instance: PlayerGameView;
    private father: FightLordLikeGameMain

    constructor(father: FightLordLikeGameMain) {
        PlayerGameView.instance = this;
        this.father = father;
    }

    // 总视图
    private _view: fgui.GObject;

    onUILoaded() {
        this._view = this.father.getChild("PlayerController");
    }
}