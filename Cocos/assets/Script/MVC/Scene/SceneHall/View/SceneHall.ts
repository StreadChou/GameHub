import {AbstractScene} from "../../../Abstract/AbstractScene";
import UI_SceneHall from "../../../../UI/SceneHall/UI_SceneHall";

export class SceneHall extends AbstractScene {
    private static _instance: SceneHall;

    protected _view: UI_SceneHall;
    protected loaded: boolean = false;

    public static get instance(): SceneHall {
        return SceneHall._instance;
    }

    onLoad() {
        SceneHall._instance = this;
        fgui.UIPackage.loadPackage("UI/Auth", this.onUILoaded.bind(this));
    }

    onUILoaded() {
        super.onUILoaded();
    }
}