import {AbstractScene} from "../../../Abstract/AbstractScene";
import UI_SceneLoading from "../../../../UI/SceneLoading/UI_SceneLoading";

export class SceneLoading extends AbstractScene {
    private static _instance: SceneLoading;
    public static get instance(): SceneLoading {
        return this._instance;
    }

    _view: UI_SceneLoading;
    loaded: boolean = false;

    onLoad() {
        SceneLoading._instance = this;
    }

    onUILoaded() {
        super.onUILoaded();
        this._view = UI_SceneLoading.createInstance();
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }


}