import {AbstractView} from "../../Abstract/AbstractView";

export class LoginView extends AbstractView {
    private _view: fgui.GComponent;




    get accountLoginButton(): fgui.GComponent {
        return this._view.getChild("").asCom;
    }

    get wechatLoginButton(): fgui.GComponent {
        return this._view.getChild("").asCom;
    }

    get guestLoginButton(): fgui.GComponent {
        return this._view.getChild("").asCom;
    }
}