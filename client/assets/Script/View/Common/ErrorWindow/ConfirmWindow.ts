import {BaseErrorWindow} from "./BaseErrorWindow";
import {EventSystem} from "../../../Event/EventSystem";
import {EVENT} from "../../../Event/EventDefine";

export class ConfirmWindow extends BaseErrorWindow {
    WindowName = "ConfirmWindow"

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;
    }

    public showMessage(message: string, callback: Function, title?: string, code?: number) {
        this.contentPane.getChild("Message").asTextField.text = message;
        if (title) this.contentPane.getChild("Title").asTextField.text = title;
        if (code) this.contentPane.getChild("Code").asTextField.text = code.toString();
        const confirmButton = this.contentPane.getChild("frame").asCom.getChild("confirmButton").asCom;

        if (!callback) {
            callback = () => {
                EventSystem.instance.fire(EVENT.ON_ERROR_CODE, {message: "错误操作!"});
            }
        }
        confirmButton.onClick(callback);

        super.show();
    }
}