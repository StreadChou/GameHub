import {BaseUiWindow} from "../../../Base/UI/BaseUiWindow";
import Login from "../Login";
import {ControllerLogic} from "../../../Controller/Logic/ControllerLogic";

export class RegisterPane extends BaseUiWindow {
    PackageName = "Login";
    WindowName = "RegisterPane";

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;

        this.contentPane.getChild("Login").asCom.onClick(() => {
            Login.instance.openLoginPane();
        })

        this.contentPane.getChild("RegisterButton").asCom.onClick(async () => {
            const form = this.getFormData();
            await ControllerLogic.getInstance().registerToAuth(form)
        })
    }

    getFormData() {
        return {
            username: this.contentPane.asCom.getChild("Account").asTextInput.text,
            password: this.contentPane.asCom.getChild("Password").asTextInput.text,
            phone: this.contentPane.asCom.getChild("Phone").asTextInput.text,
        }
    }


}