import {CreateFastRoomView} from "./CreateRoom/CreateFastRoomView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {
    private _view: fgui.GComponent;

    onLoad() {
        fgui.UIPackage.loadPackage("UI/Hall", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIPackage.addPackage("UI/Hall");
        this._view = fgui.UIPackage.createObject("Hall", "Main").asCom;
        this._view.makeFullScreen();

        fgui.GRoot.inst.addChild(this._view);
        this.initCreateRoomWindows();
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


}
