import {CreateFastRoomView} from "./CreateRoom/CreateFastRoomView";
import {UserEntity, UserServices} from "../../Model/UserServices";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {
    private _view: fgui.GComponent;
    static instance: Hall;

    onLoad() {
        Hall.instance = this;
        fgui.UIPackage.loadPackage("UI/Hall", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/Hall");
        this._view = fgui.UIPackage.createObject("Hall", "Main").asCom;
        this._view.makeFullScreen();

        fgui.GRoot.inst.addChild(this._view);
        this.initCreateRoomWindows();

        this.fillingUserInfo(UserServices.user);
    }


    // 创建房间的方法
    private _createRoomWindow: fgui.Window;

    initCreateRoomWindows() {
        const createRoomBtn = this._view.getChild("Right").asCom.getChild("CreateRoom");
        createRoomBtn.onClick(() => {
            this._createRoomWindow = this._createRoomWindow ?? new CreateFastRoomView();
            this._createRoomWindow.show();
        })
    }

    fillingUserInfo(user: UserEntity) {
        const header = this._view.getChild("Header").asCom;
        const cover = header.getChild("CoverGroup").asCom.getChild("Cover").asImage;
        const NickNode = header.getChild("Nick").asTextField;
        const LevelNode = header.getChild("Level").asTextField;
        const MoneyNode = header.getChild("GoldInfo").asCom.getChild("value");
        NickNode.text = user.nick;
        LevelNode.text = user.level.toString();
        MoneyNode.text = user.money.toString();
    }

    toGameMain(comp: any) {
        this.addComponent(comp);
    }


}
