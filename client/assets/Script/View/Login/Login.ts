import Hall from "../Hall/Hall";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component {
    private _view: fgui.GComponent;

    onLoad() {
        fgui.UIPackage.loadPackage("UI/Login", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/Login");
        this._view = fgui.UIPackage.createObject("Login", "Main").asCom;
        this._view.makeFullScreen();

        fgui.GRoot.inst.addChild(this._view);
    }

    onDestroy() {
        this._view.dispose();
    }

    onLoginSuccess() {
        this.addComponent(Hall);
        this.node.removeComponent(this);
        this.onDestroy();
    }

    initGuestLogin() {

    }


}
