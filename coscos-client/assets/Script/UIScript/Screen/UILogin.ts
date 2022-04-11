import {UIScreen} from "../../UIFrame/UIForm";
import UILogin_Auto from "../../AutoScripts/UILogin_Auto";
import Button = cc.Button;
import FormMgr from "../../UIFrame/FormMgr";
import UIConfig from "../../UIConfig";
import {Player} from "../../Logic/Player/Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILogin extends UIScreen {
    public willDestory: boolean = true;

    view: UILogin_Auto

    start() {
        this.view.GuestLogin.node.on('click', this.onClickGuestLogin, this);
    }

    onClickGuestLogin() {
        Player.instance.playerController.GuestLogin();
    }

}
