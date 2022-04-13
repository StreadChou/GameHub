import {ProtocolBase} from "../../../Base/ProtocolBase";
import {RoomPushRoute} from "../../../../constant/Route";
import {
    OnPlayerJoinRoomMessage,
    OnPlayerLeaveRoomMessage,
    OnRoomInfoMessage
} from "../../../../constant/clientDto/Server2ClientDto";
import {RoomController} from "../Controller/RoomController";

export class RoomProtocol extends ProtocolBase {
    private roomController: RoomController

    constructor(controller: RoomController) {
        super();
        this.roomController = controller;
    }

    protected initProtocols() {
        this.initProtocol(RoomPushRoute.OnRoomInfo, this.OnRoomInfo.bind(this));
        this.initProtocol(RoomPushRoute.OnPlayerJoinRoom, this.OnPlayerJoinRoom.bind(this));
        this.initProtocol(RoomPushRoute.OnPlayerLeaveRoom, this.OnPlayerLeaveRoom.bind(this));
    }

    private OnRoomInfo(message: OnRoomInfoMessage) {
        this.roomController.OnRoomInfo(message);
    }

    private OnPlayerJoinRoom(message: OnPlayerJoinRoomMessage) {

    }

    private OnPlayerLeaveRoom(message: OnPlayerLeaveRoomMessage) {

    }

}