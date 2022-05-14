import {LoadingManager} from "./MVC/Scene/SceneLoading/LoadingManager";
import {SceneLoading} from "./MVC/Scene/SceneLoading/View/SceneLoading";
import {EventSystem} from "./Library/EventSystem/EventSystem";
import {EVENT} from "./Library/EventSystem/EventDefine";

const {ccclass} = cc._decorator

@ccclass
export default class MainEntry extends cc.Component {
    private static _instance: MainEntry;

    static get instance(): MainEntry {
        return this._instance;
    }


    onLoad() {
        MainEntry._instance = this;
        this.registerError();
        fgui.GRoot.create();

        fgui.UIPackage.loadPackage("UI/Loading", this.onLoadingSceneLoaded.bind(this));
    }

    // 加载完成之后, 展示loading页面
    onLoadingSceneLoaded() {
        this.addComponent(SceneLoading);
    }


    registerError() {
        EventSystem.instance.register(EVENT.ON_ERROR, (data: any) => {
            // const errorWindows = new AlertWindow();
            // const string = data.message ?? data.code ?? "未知错误";
            // const title = data.title ?? null;
            // const code = data.code ?? null;
            // errorWindows.showMessage(string, title, code);
        })
    }

}