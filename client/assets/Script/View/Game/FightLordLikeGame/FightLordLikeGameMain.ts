import {AbstractGameMain} from "../AbstractGameMain";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FightLordLikeGameMain extends AbstractGameMain {
    private _view: fgui.GComponent;

    onLoad() {
        fgui.UIPackage.loadPackage("UI/PokerGame", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/PokerGame");
        this._view = fgui.UIPackage.createObject("PokerGame", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }


}
