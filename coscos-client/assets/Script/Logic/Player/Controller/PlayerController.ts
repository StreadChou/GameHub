import {ControllerBase} from "../../Base/ControllerBase";
import {PLAYER_CMD} from "../Const/PlayerCmd";
import {randomNumberBetween} from "../../Base/Helper/RandomHelper";
import {PlayerProtocol} from "../Protocol/PlayerProtocol";
import FormMgr from "../../../UIFrame/FormMgr";
import UIConfig from "../../../UIConfig";
import {Player} from "../Player";

export class PlayerController extends ControllerBase {
    player: Player;

    constructor(player: Player) {
        super();
        this.player = player;
    }

    protected onInit() {
        //子类重写此方法
        this._protocolIns = new PlayerProtocol(this);
        this.addProtocol();
    }

    GuestLogin() {
        const uid = randomNumberBetween(100000, 999999).toString();
        const token = randomNumberBetween(10000000, 99999999).toString()
        let msg = {uid, token};
        this.sendMsg(PLAYER_CMD.RequestLogin, msg)
    }


    OnLogin(msg: any) {
        Object.assign(this.player, msg)
        FormMgr.open(UIConfig.UIHall);
    }
}
