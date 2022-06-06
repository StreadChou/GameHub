import {AbstractWindow} from "../../../../Abstract/AbstractWindow";
import UI_LoginPanel from "../../../../../UI/SceneAuth/UI_LoginPanel";

export class LoginWindow extends AbstractWindow<UI_LoginPanel> {
    _view: UI_LoginPanel;
    static instance: LoginWindow;

    constructor() {
        super();
        LoginWindow.instance = this;
        console.log("constructor . this", this);
        this.contentPane = UI_LoginPanel.createInstance();
        console.log("constructor . contentPane", this.contentPane);
    }


}