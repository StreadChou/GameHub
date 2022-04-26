import {BaseUiWindow} from "../../../Base/UI/BaseUiWindow";
import Login from "../Login";

export class LoginPane extends BaseUiWindow {
    PackageName = "Login";
    WindowName = "LoginPane";

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;

        this.contentPane.getChild("Register").asCom.onClick(() => {
            Login.instance.openRegisterPane();
        })
    }


}