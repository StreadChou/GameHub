const {ccclass, property} = cc._decorator;
import Hall from "./View/hall/Hall";

@ccclass
export default class NewClass extends cc.Component {
    private _currentDemo: cc.Component;

    onLoad() {
        fgui.UIPackage.loadPackage("UI/Common", ()=>{
            fgui.GRoot.create();
            this.node.on("start_demo", this.onDemoStart, this);
            console.error(Hall);
            this.addComponent(Hall);
        });

    }

    onDemoStart(demo) {
        console.log(demo);
        this._currentDemo = demo;
    }

}
