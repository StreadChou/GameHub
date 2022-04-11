import {ControllerBase} from "../../Base/ControllerBase";
import {ROOM_STATE} from "../Types/Room";
import {RoomProtocol} from "../Protocol/RoomProtocol";
import {GAME_CMD} from "../Const/GameCmd";
import UIGamePoker from "../../../UIScript/Screen/UIGamePoker";
import {Player} from "../../Player/Player";

export default class RoomController extends ControllerBase {
    public master: string;
    public roomId: number;
    public password: number;
    public maxPlayer: number = 3;

    private _roomState: ROOM_STATE;

    public get roomState(): ROOM_STATE {
        return this._roomState;
    }

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

    onLoadingFinish() {
        UIGamePoker.inst.setRoomInfo(this.roomId, this.password);
    }

    createRoom(message) {
        this.sendMsg(GAME_CMD.RequestRoomCreate, message)
    }

    joinRoom(roomId: number) {
        const message = {roomId};
        this.sendMsg(GAME_CMD.RequestJoinRoom, message)
    }

    onRoomInfo(message: any) {
        this.master = message.master;
        this.roomId = message.roomId;
        this.password = message.password;
        this.maxPlayer = message.maxPlayer;
    }

    isMaster(uid: string) {
        return this.master == uid;
    }

    startGame() {
        let msg = {roomId: this.roomId};
        this.sendMsg(GAME_CMD.RequestStartGame, msg)
    }

    UIShowStartGameButton() {
        if (this.master == Player.instance.uid) {
            UIGamePoker.inst.view.StartGame.node.active = true;
        }
    }

    UIDisableStartButton() {
        UIGamePoker.inst.view.StartGame.node.active = false;
    }


}