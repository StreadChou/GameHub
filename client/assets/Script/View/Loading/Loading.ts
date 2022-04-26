const {ccclass} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
    private _view: fgui.GComponent;

    onLoad() {
        fgui.UIPackage.loadPackage("UI/Loading", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/Loading");
        this._view = fgui.UIPackage.createObject("Loading", "Main").asCom;
        this._view.makeFullScreen();

        fgui.GRoot.inst.addChild(this._view);
    }

    onDestroy() {
        this._view.dispose();
    }

}
