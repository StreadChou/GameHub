import {ControllerBase} from "../../../Base/ControllerBase";
import {RoomProtocol} from "../Protocol/RoomProtocol";
import {OnRoomInfoMessage} from "../../../../constant/clientDto/Server2ClientDto";
import FormMgr from "../../../../UIFrame/FormMgr";
import UIConfig from "../../../../UIConfig";
import {FightLordLikeGamePreloadManager} from "../Manager/FightLordLikeGamePreloadManager";
import {FightLordLikeGame} from "../FightLordLikeGame";

export class RoomController extends ControllerBase {

    protected onInit() {
        //子类重写此方法
        this._protocolIns = new RoomProtocol(this);
        this.addProtocol();
    }

    protected onFinalize() {
        //子类重写此方法
    }

    protected initEvents() {
        //初始化事件列表
    }

    public OnRoomInfo(message: OnRoomInfoMessage) {
        const preLoadManager = new FightLordLikeGamePreloadManager();
        preLoadManager.startPreLoad(async () => {
            await FormMgr.open(UIConfig.UIGamePoker, message);
            // 先处理自己的message;

            FightLordLikeGame.instance.loaded = true;
        });
    }

}