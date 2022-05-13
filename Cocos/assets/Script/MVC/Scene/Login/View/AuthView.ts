import {AbstractView} from "../../Abstract/AbstractView";
import UI_AuthMain from "../../../../UI/Auth/UI_AuthMain";
import UI_LoginPanel from "../../../../UI/Auth/UI_LoginPanel";
import {LoginWindow} from "./Window/LoginWindow";
import UI_RegisterPanel from "../../../../UI/Auth/UI_RegisterPanel";
import {RegisterWindow} from "./Window/RegisterWindow";
import {EventSystem} from "../../../../Library/EventSystem/EventSystem";
import {EVENT} from "../../../../Library/EventSystem/EventDefine";

/**
 * 界面不销毁, 如果断线的话需要回到这个页面
 */
export class AuthView extends AbstractView {
    private _view: UI_AuthMain;
    private static _instance: AuthView;
    public loaded: boolean = false;


    public static get instance(): AuthView {
        return AuthView._instance;
    }

    onLoad() {
        AuthView._instance = this;
        fgui.UIPackage.loadPackage("UI/Auth", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this.loaded = true;
        this._view = UI_AuthMain.createInstance();
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        // 设置登录和注册的代理组件
        fgui.UIObjectFactory.setExtension(UI_LoginPanel.URL, LoginWindow);
        fgui.UIObjectFactory.setExtension(UI_RegisterPanel.URL, RegisterWindow);

        this._view.m_AccountLoginButton.onClick(() => this.openLoginPanel())
        this._view.m_WechatLoginBUtton.onClick(() => EventSystem.instance.fire(EVENT.ON_ERROR, {message: "微信登录正在开发中"}));
    }


    openLoginPanel() {
        const loginWindow = new LoginWindow();
        loginWindow.show();
    }

    openRegisterPanel() {
        const registerWindow = new RegisterWindow()
        registerWindow.show();
    }

}