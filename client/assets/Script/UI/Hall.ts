const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {
    private _view: fgui.GComponent;

    onLoad() {
        fgui.UIPackage.loadPackage("UI/Hall", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/Hall");
        
        this._view = fgui.UIPackage.createObject("Hall", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }

    startDemo(demoClass: typeof cc.Component): void {
        let demo: cc.Component = this.addComponent(demoClass);
        this.node.emit("start_demo", demo);
        this.destroy();
    }


}
