import {_decorator, Component, Node, Label} from 'cc';
import {Room} from "db://assets/Script/core/src/room/Room";

const {ccclass, property} = _decorator;

@ccclass('RoomPortrait')
export class RoomPortrait extends Component {
    @property(Label)
    roomId: Label = null;

    @property(Label)
    RoomPassword: Label = null;

    start() {
        // [3]
        this.updateRoomInfo();
    }


    updateRoomInfo() {
        const room = Room.getInstance();
        this.roomId.string = `${room.roomId}`;
        this.RoomPassword.string = `${room.password}`;
    }
}