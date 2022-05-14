import {LoginWindow} from "./Window/LoginWindow";
import {RegisterWindow} from "./Window/RegisterWindow";
import {EventSystem} from "../../../../Library/EventSystem/EventSystem";
import {EVENT} from "../../../../Library/EventSystem/EventDefine";
import UI_SceneAUth from "../../../../UI/SceneAuth/UI_SceneAUth";
import UI_LoginPanel from "../../../../UI/SceneAuth/UI_LoginPanel";
import UI_RegisterPanel from "../../../../UI/SceneAuth/UI_RegisterPanel";
import {AbstractScene} from "../../../Abstract/AbstractScene";

/**
 * 界面不销毁, 如果断线的话需要回到这个页面
 */
export class SceneAuth extends AbstractScene {
    private static _instance: SceneAuth;

    protected _view: UI_SceneAUth;
    protected loaded: boolean = false;


    public static get instance(): SceneAuth {
        return SceneAuth._instance;
    }

    onLoad() {
        SceneAuth._instance = this;
        fgui.UIPackage.loadPackage("UI/Auth", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        super.onUILoaded();
        this._view = UI_SceneAUth.createInstance();
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