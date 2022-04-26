import {BaseUiWindow} from "../../../Base/UI/BaseUiWindow";
import Login from "../Login";

export class RegisterPane extends BaseUiWindow {
    PackageName = "Login";
    WindowName = "RegisterPane";

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;

        this.contentPane.getChild("Login").asCom.onClick(() => {
            Login.instance.openLoginPane();
        })
    }


}