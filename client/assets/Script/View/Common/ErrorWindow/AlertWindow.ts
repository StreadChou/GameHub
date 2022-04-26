import {BaseErrorWindow} from "./BaseErrorWindow";

export class AlertWindow extends BaseErrorWindow {
    WindowName = "AlertWindow"

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject("Common", this.WindowName).asCom;
    }

    public showMessage(message: string) {
        this.contentPane.getChild("Message").asTextField.text = message;
        super.show();
    }
}