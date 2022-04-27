import {BaseCreateRoomView} from "./BaseCreateRoomView";
import {RunFastConfig} from "../../../Constant/Game";

export class CreateFastRoomView extends BaseCreateRoomView {
    public constructor() {
        super();
    }

    protected onInit(): void {
        this.contentPane = fgui.UIPackage.createObject("Hall", "CreateRunFastRoom").asCom;
        this.contentPane.makeFullScreen();

        // this.center();

        // 弹出窗口的动效已中心为轴心
        this.setPivot(0.5, 0.5);

        this.contentPane.getChild("createButton").onClick(this.createRoom, this);

    }

    protected onShown() {

    }


    protected doShowAnimation(): void {
        this.setScale(0.1, 0.1);
        fgui.GTween.to2(0.1, 0.1, 1, 1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.onShown, this);
    }

    protected doHideAnimation(): void {
        fgui.GTween.to2(1, 1, 0.1, 0.1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.hideImmediately, this);
    }


    createRoom() {
        const options = this.getOptions();
        console.error("创建跑得快房间", options);
    }

    getOptions() {
        const optsPane = this.contentPane.getChild("optsPane").asCom;

        const playerNumber = parseInt(optsPane.getController("playerSelect").selectedPage);
        const pokerNumber = parseInt(optsPane.getController("pokerNumber").selectedPage);
        const whoPay = parseInt(optsPane.getController("whoPay").selectedPage);
        const dealPoker = parseInt(optsPane.getController("dealPoker").selectedPage);
        const chat = parseInt(optsPane.getController("chat").selectedPage);

        const double = parseInt(optsPane.getController("double").selectedPage);
        const addPoints = parseInt(optsPane.getController("addPoints").selectedPage);

        const getSetting = (type: RunFastConfig): boolean => {
            const settingPane = optsPane.getChild(`setting_${type}`);
            if (!settingPane) return undefined;
            return settingPane.asButton.selected;
        }

        // @ts-ignore, 初始化的时候不给值
        const setting: { [key in SettingEnum]: boolean } = {};
        Object.values(RunFastConfig).forEach(key => {
            if (Number.isInteger(key)) {
                // @ts-ignore
                setting[key] = getSetting(key);
            }
        })

        return {playerNumber, pokerNumber, whoPay, dealPoker, chat, double, addPoints, setting}
    }
}

