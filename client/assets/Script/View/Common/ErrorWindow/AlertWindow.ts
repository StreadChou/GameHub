import {BaseErrorWindow} from "./BaseErrorWindow";

export class AlertWindow extends BaseErrorWindow {
    WindowName = "AlertWindow"

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;
    }

    public showMessage(message: string, title?: string, code?: number) {
        this.contentPane.getChild("Message").asTextField.text = message;
        super.show();
    }
}