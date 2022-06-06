import {SceneLoading} from "./MVC/Scene/SceneLoading/View/SceneLoading";
import {EventSystem} from "./Library/EventSystem/EventSystem";
import {EVENT} from "./Library/EventSystem/EventDefine";
import {SceneAuth} from "./MVC/Scene/SceneAuth/View/SceneAuth";
import {AlertWindow} from "./MVC/Common/Window/AlertWindow";
import CommonBinder from "./UI/Common/CommonBinder";
import {AlertWindowFullScreen} from "./MVC/Common/Window/AlertWindowFullScreen";

const {ccclass} = cc._decorator

@ccclass
export default class MainEntry extends cc.Component {
    private static _instance: MainEntry;
    private loadingComponent: SceneLoading = null;

    static get instance(): MainEntry {
        return this._instance;
    }

    static get loadingComponent(): SceneLoading {
        return MainEntry.loadingComponent;
    }


    onLoad() {
        MainEntry._instance = this;
        this.registerError();
        fgui.GRoot.create();
        this.loadingComponent = this.addComponent(SceneLoading);
        this.loadingComponent.loadCallback = () => {
            const resourceList = [];
            const loadPackage = ["Common", "SceneAuth", "SceneHall"];
            loadPackage.forEach(ele => {
                resourceList.push(`UI/${ele}`)
                resourceList.push(`UI/${ele}_atlas0`)
            })

            cc.loader.loadResArray(resourceList, (err, assets) => {
                fgui.UIPackage.addPackage("UI/Common");
                CommonBinder.bindAll();

                this.loadingComponent.setProcess(98)
                setTimeout(() => {
                    this.loadingComponent.setProcess(100)
                }, 500)
            });

            this.loadingComponent.startProcess(this.onLoadAllPackageSuccess.bind(this))
        }
    }

    // 所有内容加载完成之后调用的内容
    onLoadAllPackageSuccess() {
        this.addComponent(SceneAuth);
    }


    registerError() {
        EventSystem.instance.register(EVENT.ON_ERROR, (data: any) => {
            const errorWindows = new AlertWindowFullScreen();
            const message = data.message ?? data.code ?? "未知错误";
            const title = data.title ?? null;
            const code = data.code ?? null;
            errorWindows.showMessage(message, title, code);
        })
    }

}