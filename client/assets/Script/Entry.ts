import {EventSystem} from "./Event/EventSystem";

const {ccclass, property} = cc._decorator;
import Hall from "./View/Hall/Hall";
import {EVENT} from "./Event/EventDefine";
import {NetworkManager} from "./Lib/NetWork/NetworkManager";

@ccclass
export default class Entry extends cc.Component {
    private _currentDemo: cc.Component;

    onLoad() {
        NetworkManager.instance.openMainSocket("127.0.0.1", 3010);

        fgui.UIPackage.loadPackage("UI/Common", () => {
            fgui.GRoot.create();
            this.addComponent(Hall);

            this.registerError();
        });
    }

    registerError() {
        EventSystem.instance.register(EVENT.ON_ERROR_CODE, (message: any) => {
            console.error(`收到error消息`, message);
        })
    }

    onDemoStart(demo) {
        console.log(demo);
        this._currentDemo = demo;
    }

}
