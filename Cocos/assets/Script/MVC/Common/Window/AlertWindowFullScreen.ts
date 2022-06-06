import {AlertWindow} from "./AlertWindow";
import UI_AlertWindowFullScreen from "../../../UI/Common/UI_AlertWindowFullScreen";

export class AlertWindowFullScreen extends AlertWindow {
    static instance: AlertWindowFullScreen;

    constructor() {
        super();
        AlertWindowFullScreen.instance = this;
        this.contentPane = UI_AlertWindowFullScreen.createInstance().asCom;
    }

    protected onInit(): void {
        this.makeFullScreen();
        // 弹出窗口的动效已中心为轴心, 动画可以自然一点
        this.setPivot(0.5, 0.5);
    }


    showMessage(message: string, title?: string, code?: number) {
        this.contentPane.m_Message.text = message;
        this.contentPane.m_Title.text = title ?? "操作失败";
        this.contentPane.m_CodeValue.text = code ? code.toString() : "500";
        this.show();
    }
}