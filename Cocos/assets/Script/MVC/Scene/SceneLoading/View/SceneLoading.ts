import {AbstractScene} from "../../../Abstract/AbstractScene";
import UI_SceneLoading from "../../../../UI/SceneLoading/UI_SceneLoading";
import SceneLoadingBinder from "../../../../UI/SceneLoading/SceneLoadingBinder";
import value = cc.js.value;

export class SceneLoading extends AbstractScene {
    private static _instance: SceneLoading;

    protected _view: UI_SceneLoading;
    protected loaded: boolean = false;
    public loadCallback: Function;

    timeInterval: number; // 每秒定时器

    public static get instance(): SceneLoading {
        return SceneLoading._instance;
    }

    onLoad() {
        SceneLoading._instance = this;
        fgui.UIPackage.loadPackage("UI/SceneLoading", this.onUILoaded.bind(this));

        // 创建View
        SceneLoadingBinder.bindAll();
    }

    onUILoaded() {
        super.onUILoaded();

        this._view = UI_SceneLoading.createInstance();
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        // 回调
        if (this.loadCallback) this.loadCallback();
    }

    // 开始一个进度条
    startProcess(callback: Function, other?: { value?: number, max?: number }) {
        other = other ?? {};
        if (other.value) this._view.m_LoadingBar.value = other.value;
        if (other.max) this._view.m_LoadingBar.max = other.max;

        this.timeInterval = setInterval(() => {
            const max = this._view.m_LoadingBar.max;
            console.log(this._view.m_LoadingBar.value, max, this._view.m_LoadingBar.value >= max)
            if (this._view.m_LoadingBar.value >= max) {
                clearInterval(this.timeInterval);
                this.timeInterval = undefined;
                callback();
            } else {
                this.incrProcess(1)
            }
        }, 1000);
    }


    setProcess(value: number) {
        this._view.m_LoadingBar.value = value;
    }

    incrProcess(value: number) {
        if (this._view.m_LoadingBar.value + value > this._view.m_LoadingBar.max) return undefined;
        this._view.m_LoadingBar.value += value;
    }

}