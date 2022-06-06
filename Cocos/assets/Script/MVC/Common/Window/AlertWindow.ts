import {AbstractWindow} from "../../Abstract/AbstractWindow";
import UI_AlertWindow from "../../../UI/Common/UI_AlertWindow";

export class AlertWindow extends AbstractWindow<UI_AlertWindow> {

    static instance: AlertWindow;

    constructor() {
        super();
        AlertWindow.instance = this;
        this.contentPane = UI_AlertWindow.createInstance().asCom;
    }

    showMessage(message: string, title?: string, code?: number) {
        this.contentPane.m_Message.text = message;
        this.contentPane.m_Title.text = title ?? "操作失败";
        this.contentPane.m_CodeValue.text = code ? code.toString() : "500";
        this.show();
    }
}