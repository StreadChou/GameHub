import {EventSystem} from "./Event/EventSystem";
import {EVENT} from "./Event/EventDefine";
import {NetworkManager} from "./Lib/NetWork/NetworkManager";
import Loading from "./View/Loading/Loading";
import Login from "./View/Login/Login";
import {AlertWindow} from "./View/Common/ErrorWindow/AlertWindow";

const {ccclass} = cc._decorator;


@ccclass
export default class Entry extends cc.Component {
    private _currentDemo: cc.Component;

    onLoad() {
        NetworkManager.instance.openMainSocket("127.0.0.1", 3010);
        fgui.GRoot.create();
        const loading = this.addComponent(Loading);

        fgui.UIPackage.loadPackage("UI/Common", () => {
            loading.setProcess(100);

            setTimeout(()=>{
                this.addComponent(Login);
                this.node.removeComponent(loading);
                loading.destroy();
                this.registerError();
            }, 1000)
        });
    }

    registerError() {
        EventSystem.instance.register(EVENT.ON_ERROR_CODE, (data: any) => {
            const errorWindows = new AlertWindow();
            const string = data.message ?? data.code ?? "未知错误";
            errorWindows.showMessage(string);
            console.error(`收到error消息`, data);
        })
    }

    onDemoStart(demo) {
        console.log(demo);
        this._currentDemo = demo;
    }

}
