import Hall from "../Hall/Hall";
import {EventSystem} from "../../Event/EventSystem";
import {EVENT} from "../../Event/EventDefine";
import {LoginPane} from "./AccountPane/LoginPane";
import {RegisterPane} from "./AccountPane/RegisterPane";
import Entry from "../../Entry";
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
            ControllerLogic.getInstance().guestLogin();
            // EventSystem.instance.fire(EVENT.ON_ERROR_CODE, {message: "游客登录已被禁止"});
        })

        this._view.getChild("AccountLogin").onClick(this.openLoginPane.bind(this));
    }

    onDestroy() {
        this._view.dispose();
    }

    private loginPane: LoginPane;
    private registerPane: RegisterPane;

    openLoginPane() {
        if (this.registerPane) {
            this.registerPane.hide();
        }
        this.loginPane = this.loginPane ?? new LoginPane();
        this.loginPane.show();
    }

    openRegisterPane() {
        if (this.loginPane) {
            this.loginPane.hide();
        }
        this.registerPane = this.registerPane ?? new RegisterPane();
        this.registerPane.show();
    }
}
