import {BaseCreateRoomView} from "./BaseCreateRoomView";
import {
    GameEnum,
    GameTypeEnum,
    RunFastConfig,
    RunFastRoomOptions
} from "../../../Constant/Game";
import {ControllerRoom} from "../../../Controller/Room/ControllerRoom";

export class CreateRunFastRoomView extends BaseCreateRoomView {
    WindowName = "CreateRunFast"

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;
    }

    protected onInit(): void {
        this.contentPane.makeFullScreen();
        // 弹出窗口的动效已中心为轴心
        this.setPivot(0.5, 0.5);
        this.frame.getChild("create").onClick(this.createRoom, this);
    }


    createRoom() {
        const _options = this.getOptions();
        console.log(_options);

        const createOption: { options: RunFastRoomOptions } = {
            options: {
                gameEnum: GameEnum.RunFast,
                gameTypeEnum: GameTypeEnum.FightLordLike,

                maxPlayer: _options.playerNumber,
                whoPay: _options.whoPay,
                chat: _options.chat,

                pokerNumber: _options.pokerNumber,
                dealPoker: _options.dealPoker, // 单次发牌
                double: _options.double,
                addPoints: _options.addPoints,
                config: _options.setting,
            }

        }
        ControllerRoom.getInstance().createRoom(createOption)
    }

    getOptions() {
        const optsPane = this.contentPane.getChild("options").asCom;

        const playerNumber = parseInt(optsPane.getController("playerNumber").selectedPage);
        const pokerNumber = parseInt(optsPane.getController("pokerNumber").selectedPage);
        const chat = !!optsPane.getController("chat").selectedPage;

        const whoPay = parseInt(optsPane.getController("whoPay").selectedPage);
        const dealPoker = parseInt(optsPane.getController("dealPoker").selectedPage);


        const double = !!optsPane.getController("double").selectedPage
        const addPoints = !!optsPane.getController("addPoints").selectedPage

        const getSetting = (type: string): boolean => {
            const settingPane = optsPane.getChild(`setting_${type}`);
            if (!settingPane) return undefined;
            return settingPane.asButton.selected;
        }

        // @ts-ignore, 初始化的时候不给值
        const setting: { [key in RunFastConfig]: boolean } = {};
        Object.values(RunFastConfig).forEach(key => {
            if (!Number.isInteger(key)) {
                // @ts-ignore
                setting[key] = getSetting(key);
            }
        })

        return {playerNumber, pokerNumber, whoPay, dealPoker, chat, double, addPoints, setting}
    }
}

