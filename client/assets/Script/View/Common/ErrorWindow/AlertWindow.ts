import {BaseErrorWindow} from "./BaseErrorWindow";

export class AlertWindow extends BaseErrorWindow {
    WindowName = "AlertWindow"

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;
    }

    public showMessage(message: string, title?: string, code?: number) {
        this.contentPane.getChild("Message").asTextField.text = message;
        if (title) this.contentPane.getChild("Title").asTextField.text = title;
        if (code) this.contentPane.getChild("Code").asTextField.text = code.toString();
        super.show();
    }
}