import RoomController from "../Controller/RoomController";
import {ProtocolBase} from "../../Base/ProtocolBase";
import {GAME_CMD} from "../Const/GameCmd";
import FormMgr from "../../../UIFrame/FormMgr";
import UIConfig from "../../../UIConfig";
import PokerGame from "../PokerGame";
import {PreloadManager} from "../Manager/PreloadManager";


export class RoomProtocol extends ProtocolBase {
    private _controller: RoomController;

    constructor(controller: RoomController) {
        super();
        this._controller = controller;
    }

    protected initProtocols() {
        this.initProtocol(GAME_CMD.OnRoomInfo, this.OnRoomInfo.bind(this));

        this.initProtocol(GAME_CMD.RequestRoomCreate, this.OnRoomCreate.bind(this));
        this.initProtocol(GAME_CMD.OnPlayerJoinRoom, this.OnPlayerJoinRoom.bind(this));
        this.initProtocol(GAME_CMD.OnPlayerLeaveRoom, this.OnPlayerLeaveRoom.bind(this));
    }


    OnRoomInfo(message: any) {
        PokerGame.instance.roleController.addRole(message.playerList);
        PokerGame.instance.roomController.onRoomInfo(message);

        FormMgr.open(UIConfig.UILoading);
        let preload = new PreloadManager();
        preload.startPreLoad(async () => {
            await FormMgr.open(UIConfig.UIGamePoker, message);
            PokerGame.instance.roleController.onLoadingFinish();
            PokerGame.instance.roomController.onLoadingFinish();
            PokerGame.instance.gameController.onLoadingFinish();
        });
    }

    OnRoomCreate(message: any) {
        this._controller.joinRoom(message.data.roomId);
    }

    OnPlayerJoinRoom(message: any) {
        PokerGame.instance.roleController.addRole([message]);
    }

    OnPlayerLeaveRoom(message: any) {
        PokerGame.instance.roleController.deleteRole(message);
    }


}