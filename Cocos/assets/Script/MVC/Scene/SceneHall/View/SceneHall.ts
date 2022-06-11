import {AbstractScene} from "../../../Abstract/AbstractScene";
import UI_SceneHall from "../../../../UI/SceneHall/UI_SceneHall";
import SceneAuthBinder from "../../../../UI/SceneAuth/SceneAuthBinder";
import {RoomLogicController} from "../Controller/RoomLogicController";
import {EventSystem} from "../../../../Library/EventSystem/EventSystem";
import {EVENT} from "../../../../Library/EventSystem/EventDefine";

export class SceneHall extends AbstractScene {
    private static _instance: SceneHall;

    protected _view: UI_SceneHall;
    protected loaded: boolean = false;
    protected roomLogicController: RoomLogicController;

    public static get instance(): SceneHall {
        return SceneHall._instance;
    }

    onLoad() {
        SceneHall._instance = this;
        fgui.UIPackage.addPackage("UI/SceneAuth");
        this.roomLogicController = RoomLogicController.instance;
    }

    onUILoaded() {
        super.onUILoaded();
        SceneAuthBinder.bindAll();
        this._view = UI_SceneHall.createInstance();
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
        this.initHall();
    }

    // 初始化主界面
    initHall() {
        this.initPlayingArea();
    }

    // 初始化游戏玩法区域
    initPlayingArea() {
        this._view.m_ButtonRunFast.onClick(() => this.roomLogicController.createRoom());
        this._view.m_ButtonChangShaMahjong.onClick(() => this.roomLogicController.createRoom());
        this._view.m_ButtonAnyValueMahjong.onClick(() => this.roomLogicController.createRoom());
        this._view.m_ButtonFightLord.onClick(() => this.roomLogicController.createRoom());
        this._view.m_ButtonThreeFightOne.onClick(() => this.roomLogicController.createRoom());
        this._view.m_ButtonRoundMahjong.onClick(() => this.roomLogicController.createRoom());
        this._view.m_ButtonMoreGame.onClick(() => EventSystem.instance.fire(EVENT.ON_ERROR, {message: "更多游戏开发中"}));
    }


}