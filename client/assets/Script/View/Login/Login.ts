import Hall from "../Hall/Hall";
import {EventSystem} from "../../Event/EventSystem";
import {EVENT} from "../../Event/EventDefine";
import {ControllerLogic} from "../../Controller/Logic/ControllerLogic";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component {
    private _view: fgui.GComponent;
    static instance: Login;

    onLoad() {
        Login.instance = this;
        fgui.UIPackage.loadPackage("UI/Login", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/Login");
        this._view = fgui.UIPackage.createObject("Login", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._view.getChild("WechatLogin").onClick(() => {
            EventSystem.instance.fire(EVENT.ON_ERROR_CODE, {message: "微信登录正在开发中"});
        })

        this._view.getChild("GuestLogin").onClick(() => {
            ControllerLogic.getInstance().onLoginSuccess();
        })

    }

    onDestroy() {
        this._view.dispose();
    }


    onLoginSuccess() {
        this.addComponent(Hall);
        this.node.removeComponent(this);
        this.onDestroy();
    }

}
