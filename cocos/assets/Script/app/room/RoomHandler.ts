import {_decorator, Component, Node, EditBox, BaseNode, director} from 'cc';
import {NetworkManager} from "db://assets/Script/core/src/network/NetworkManager";
import {GamePushRoute, RoomPushRoute} from "db://assets/Script/core/constant/Route";
import {User} from "db://assets/Script/core/src/user/User";
import {Room} from "db://assets/Script/core/src/room/Room";

const {ccclass, property} = _decorator;


@ccclass('RoomHandler')
export class RoomHandler extends Component {
    private network: NetworkManager

    @property(Node)
    startGameNode: Node = null;

    onLoad() {
        this.network = NetworkManager.getInstance();
        this.network.listenRoute(RoomPushRoute.OnRoomInfo, this.onRoomInfo.bind(this))
        this.network.listenRoute(RoomPushRoute.OnPlayerJoinRoom, this.onPlayerJoinRoom.bind(this))
    }

    createRoom() {
        this.network.request("room.roomHandler.createRoom", {}, (data) => {
            this.network.request("room.roomHandler.joinRoom", {roomId: data.data.roomId});
        });
    }

    joinRoom() {
        const roomId = this.node.getChildByName("RoomIdInput").getComponent(EditBox).string;
        this.network.request("room.roomHandler.joinRoom", {roomId});
    }

    startGame() {
        const room = Room.getInstance();
        if (Object.keys(room.playerSeatMap).length <= 1) {
            return false;
        }
        this.network.request("room.roomHandler.startGame", {roomId: room.roomId});
    }

    onRoomInfo(route: string, data: any, info: any) {
        const room = Room.getInstance(data);
        director.loadScene("LookDispair");
    }

    onPlayerJoinRoom(route: string, data: any, info: any) {
        const room = Room.getInstance(data);
        room.onPlayerJoinRoom(data);
    }


}