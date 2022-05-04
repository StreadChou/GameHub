import {EventSystem} from "./Event/EventSystem";
import {EVENT} from "./Event/EventDefine";
import {NetworkManager} from "./Lib/NetWork/NetworkManager";
import Loading from "./View/Loading/Loading";
import Login from "./View/Login/Login";
import {AlertWindow} from "./View/Common/ErrorWindow/AlertWindow";

const {ccclass} = cc._decorator;


@ccclass
export default class Entry extends cc.Component {
    private _currentScenes: cc.Component;
    static instance: Entry;

    // 首先先显示Loading界面, 加载完成之后跳转到登录界面
    onLoad() {
        Entry.instance = this;

        NetworkManager.instance.openMainSocket("127.0.0.1", 3010);
        fgui.GRoot.create();

        const loading = <Loading>this.changeScenes(Loading);

        this.registerError();

        fgui.UIPackage.loadPackage("UI/Common", () => {
            loading.setProcess(100);
            setTimeout(() => {
                this.changeScenes(Login)
            }, 500)
        });
    }

    registerError() {
        EventSystem.instance.register(EVENT.ON_ERROR_CODE, (data: any) => {
            const errorWindows = new AlertWindow();
            const string = data.message ?? data.code ?? "未知错误";
            const title = data.title ?? null;
            const code = data.code ?? null;
            errorWindows.showMessage(string, title, code);
        })
    }

    changeScenes(scenes) {
        const oldScenes = this._currentScenes;
        this._currentScenes = this.addComponent(scenes);
        if (oldScenes) this.node.removeComponent(oldScenes);
        return this._currentScenes;
    }

}
