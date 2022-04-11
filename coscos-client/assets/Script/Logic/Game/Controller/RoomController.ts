import {ControllerBase} from "../../Base/ControllerBase";
import {ROOM_STATE} from "../Types/Room";
import {RoomProtocol} from "../Protocol/RoomProtocol";
import {GAME_CMD} from "../Const/GameCmd";
import UIGamePoker from "../../../UIScript/Screen/UIGamePoker";

export default class RoomController extends ControllerBase {
    private master: string;
    private roomId: number;
    private password: number;
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

    createRoom() {
        let msg = {uid: ""};
        this.sendMsg(GAME_CMD.RequestRoomCreate, msg)
    }

    joinRoom(roomId: number) {
        const message = {roomId};
        this.sendMsg(GAME_CMD.RequestJoinRoom, message)
    }

    onRoomInfo(message: any) {
        this.master = message.master;
        this.roomId = message.roomId;
        this.password = message.password;
    }

    isMaster(uid: string) {
        return this.master == uid;
    }


}