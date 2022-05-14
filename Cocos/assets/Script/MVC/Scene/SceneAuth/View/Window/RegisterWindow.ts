import {AbstractWindow} from "../../../../Abstract/AbstractWindow";
import UI_RegisterPanel from "../../../../../UI/SceneAuth/UI_RegisterPanel";

export class RegisterWindow extends AbstractWindow<UI_RegisterPanel> {
    _view: UI_RegisterPanel;
    static instance: RegisterWindow;

    constructor() {
        super();
        RegisterWindow.instance = this;
        this._view = UI_RegisterPanel.createInstance();

    }

}