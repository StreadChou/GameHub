import UI_LoginPanel from "../../../../../UI/Auth/UI_LoginPanel";
import {AbstractWindow} from "../../../../Abstract/AbstractWindow";

export class LoginWindow extends AbstractWindow<UI_LoginPanel> {
    _view: UI_LoginPanel;

    constructor() {
        super();
        this._view = UI_LoginPanel.createInstance();
    }
}