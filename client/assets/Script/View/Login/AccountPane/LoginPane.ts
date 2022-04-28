import {BaseUiWindow} from "../../../Base/UI/BaseUiWindow";
import Login from "../Login";
import {ControllerLogic} from "../../../Controller/Logic/ControllerLogic";

export class LoginPane extends BaseUiWindow {
    PackageName = "Login";
    WindowName = "LoginPane";

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;

        this.contentPane.getChild("Register").asCom.onClick(() => {
            Login.instance.openRegisterPane();
        })

        this.contentPane.getChild("LoginButton").asCom.onClick(async () => {
            const form = this.getFormData();
            await ControllerLogic.getInstance().loginToAuth(form)
        })
    }

    getFormData() {
        return {
            username: this.contentPane.asCom.getChild("Account").asTextInput.text,
            password: this.contentPane.asCom.getChild("Password").asTextInput.text,
        }
    }


}