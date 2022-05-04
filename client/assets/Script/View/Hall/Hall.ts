import {CreateFastRoomView} from "./CreateRoom/CreateFastRoomView";
import {UserEntity, UserServices} from "../../Model/UserServices";
import {AlertWindow} from "../Common/ErrorWindow/AlertWindow";

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
        this._view.getChild("RunFastButton").onClick(() => {
            const window = new CreateFastRoomView();
            window.show();
        })
        // const createRoomBtn = this._view.getChild("Right").asCom.getChild("CreateRoom");
        // createRoomBtn.onClick(() => {
        //     this._createRoomWindow = this._createRoomWindow ?? new CreateFastRoomView();
        //     this._createRoomWindow.show();
        // })
    }

    fillingUserInfo(user: UserEntity) {
        const CoverNode = this._view.getChild("Cover").asCom;
        CoverNode.icon = user.cover;

        const NickNode = this._view.getChild("NickName").asTextField;
        NickNode.text = user.nick;

        const GoldNode = this._view.getChild("Gold").asButton;
        GoldNode.text = user.money.toString();


        const MoneyNode = this._view.getChild("Money").asButton;
        MoneyNode.text = user.money.toString();

    }

}
