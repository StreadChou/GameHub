import {BaseUiWindow} from "../../../Base/UI/BaseUiWindow";
import Login from "../Login";
import {ControllerLogic} from "../../../Controller/Logic/ControllerLogic";
import {EventSystem} from "../../../Event/EventSystem";
import {EVENT} from "../../../Event/EventDefine";
import Entry from "../../../Entry";
import Hall from "../../Hall/Hall";

export class LoginPane extends BaseUiWindow {
    PackageName = "Login";
    WindowName = "LoginPane";

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;

        this.contentPane.getChild("RegisterButton").asCom.onClick(() => {
            Login.instance.openRegisterPane();
        })

        this.contentPane.getChild("ForgetPasswordButton").asCom.onClick(() => {
            EventSystem.instance.fire(EVENT.ON_ERROR_CODE, {message: "忘记密码功能正在开发中!"});
        })

        this.contentPane.getChild("Login").asCom.onClick(async () => {
            const form = this.getFormData();
            console.log("登录表单:", form);
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