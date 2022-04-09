import {_decorator, Component, Node, EditBox, BaseNode, director} from 'cc';
import {Room, RoomPlayer} from "db://assets/Script/core/src/room/Room";
import {User} from "db://assets/Script/core/src/user/User";

const {ccclass, property} = _decorator;


@ccclass('RoomPlayerManager')
export class RoomPlayerManager extends Component {
    room: Room = Room.getInstance();
    user: User = User.getInstance();

    @property(Node)
    seatIndex0: Node = null;

    @property(Node)
    seatIndex1: Node = null;

    @property(Node)
    seatIndex2: Node = null;

    @property(Node)
    RoundCtrl: Node = null;

    @property(Node)
    RoundPass: Node = null;

    @property(Node)
    RoundPlay: Node = null;


    start() {
        this.reseatPlayerSeat();
        this.room.setRoomPlayerManager(this);
    }

    reseatPlayerSeat(data?: RoomPlayer) {
        const mySeat = this.room.seat;
        for (let seat in this.room.playerSeatMap) {
            let targetOffset = parseInt(seat) - mySeat;
            if (targetOffset < 0) targetOffset = this.room.maxPlayer + targetOffset;
            console.log("targetOffset", targetOffset, parseInt(seat), mySeat);
            (this[`seatIndex${targetOffset}`] as Node).active = true;
            this.room.playerSeatMap[seat].index = targetOffset;
        }
    }

}