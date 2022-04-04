import {_decorator, Component, Node, EditBox, BaseNode, director} from 'cc';
import {Room, RoomPlayer} from "db://assets/Script/core/src/room/Room";
import {User} from "db://assets/Script/core/src/user/User";

const {ccclass, property} = _decorator;


@ccclass('RoomPlayerManager')
export class RoomPlayerManager extends Component {
    SeatMainNode: BaseNode;
    SeatA: BaseNode;
    SeatB: BaseNode;
    SeatC: BaseNode;
    SeatD: BaseNode;
    room: Room = Room.getInstance();
    seatMax: number = 5;

    start() {
        this.SeatMainNode = this.node.getChildByName("SeatMain");
        this.SeatA = this.node.getChildByName("SeatA");
        this.SeatB = this.node.getChildByName("SeatB");
        this.SeatC = this.node.getChildByName("SeatC");
        this.SeatD = this.node.getChildByName("SeatD");

        this.reseatPlayerSeat();
        this.room.setRoomPlayerManager(this);
    }

    reseatPlayerSeat() {
        const mySeat = this.room.seat;
        for (let seat in this.room.playerSeatMap) {
            let targetOffset = parseInt(seat) - mySeat;
            if (targetOffset < 0) targetOffset = this.seatMax + targetOffset;

            if (targetOffset == 0) this.SeatMainNode.active = true;
            if (targetOffset == 1) this.SeatD.active = true;
            if (targetOffset == 2) this.SeatC.active = true;
            if (targetOffset == 3) this.SeatB.active = true;
            if (targetOffset == 4) this.SeatA.active = true;
        }
    }

}