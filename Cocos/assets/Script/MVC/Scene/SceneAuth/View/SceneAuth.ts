import {LoginWindow} from "./Window/LoginWindow";
import {RegisterWindow} from "./Window/RegisterWindow";
import {EventSystem} from "../../../../Library/EventSystem/EventSystem";
import {EVENT} from "../../../../Library/EventSystem/EventDefine";
import UI_LoginPanel from "../../../../UI/SceneAuth/UI_LoginPanel";
import UI_RegisterPanel from "../../../../UI/SceneAuth/UI_RegisterPanel";
import {AbstractScene} from "../../../Abstract/AbstractScene";
import SceneAuthBinder from "../../../../UI/SceneAuth/SceneAuthBinder";
import UI_SceneAuth from "../../../../UI/SceneAuth/UI_SceneAuth";

/**
 * 界面不销毁, 如果断线的话需要回到这个页面
 */
export class SceneAuth extends AbstractScene {
    private static _instance: SceneAuth;

    protected _view: UI_SceneAuth;
    protected loaded: boolean = false;


    public static get instance(): SceneAuth {
        return SceneAuth._instance;
    }

    onLoad() {
        SceneAuth._instance = this;
        fgui.UIPackage.addPackage("UI/SceneHall");
        this.onUILoaded();
    }

    onUILoaded() {
        super.onUILoaded();
        SceneAuthBinder.bindAll();
        this._view = UI_SceneAuth.createInstance();
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        // 设置登录和注册的代理组件
        fgui.UIObjectFactory.setExtension(UI_LoginPanel.URL, LoginWindow);
        fgui.UIObjectFactory.setExtension(UI_RegisterPanel.URL, RegisterWindow);

        this._view.m_AccountLoginButton.onClick(() => this.openLoginPanel())
        this._view.m_WechatLoginButton.onClick(() => EventSystem.instance.fire(EVENT.ON_ERROR, {message: "微信登录正在开发中"}));
    }


    openLoginPanel() {
        const registerWindow = RegisterWindow.instance;
        if (registerWindow) registerWindow.hide();
        console.log("LoginWindow.instance", LoginWindow.instance);

        const loginWindow = LoginWindow.instance ?? new LoginWindow();
        loginWindow.show();
    }

    openRegisterPanel() {
        const loginWindow = LoginWindow.instance
        if (loginWindow) loginWindow.hide();
        const registerWindow = RegisterWindow.instance ?? new RegisterWindow();
        registerWindow.show();
    }

}