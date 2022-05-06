import {BaseUiWindow} from "../../../Base/UI/BaseUiWindow";
import {ControllerRoom} from "../../../Controller/Room/ControllerRoom";

export class JoinRoomWindow extends BaseUiWindow {
    PackageName = "Hall"
    WindowName = "JoinRoomWindow"

    constructor() {
        super();
        this.contentPane = fgui.UIPackage.createObject(this.PackageName, this.WindowName).asCom;
    }

    protected onInit(): void {
        this.contentPane.makeFullScreen();
        // 弹出窗口的动效已中心为轴心
        this.setPivot(0.5, 0.5);
        this.frame.getChild("confirmButton").onClick(this.joinRoom, this);
    }


    joinRoom() {
        const options = this.getOptions();
        console.log(options);
        ControllerRoom.getInstance().joinRoom(options)
    }

    getOptions() {
        return  {
            roomId: this.contentPane.getChild("RoomId").asTextInput.text,
            password: this.contentPane.getChild("Password").asTextInput.text,
        }
    }
}

