const {ccclass} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
    private _view: fgui.GComponent;
    process = 0;
    private virtualTimer;

    onLoad() {
        fgui.UIPackage.loadPackage("UI/Loading", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/Loading");
        this._view = fgui.UIPackage.createObject("Loading", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this.virtualTimer = setInterval(() => {
            if (this.process < 99) {
                this.setProcess(this.process + 1);
            } else {
                clearInterval(this.virtualTimer);
                this.virtualTimer = undefined;
            }
        }, 100)
    }

    onDestroy() {
        console.error("Loading destroy")
        this._view.dispose();
    }

    setProcess(number: number) {
        this.process = number;
        this._view.getChild("LoadingSlider").asProgress.value = this.process;
    }

}
