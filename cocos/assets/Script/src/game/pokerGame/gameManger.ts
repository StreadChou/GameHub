import {_decorator, Component, Node, EditBox, BaseNode, director} from 'cc';
import {NetworkManager} from "db://assets/Script/core/src/network/NetworkManager";
import {Room} from "db://assets/Script/core/src/room/Room";

const {ccclass, property} = _decorator;

@ccclass('GameManger')
export class GameManger extends Component {
    private network: NetworkManager = NetworkManager.getInstance();
    private room: Room = Room.getInstance();


    start() {

    }

    refreshPlayer(){

    }

    createRoom() {

    }

    joinRoom(roomId?: string) {

    }

    onRoomInfo(route: string, data: any, info: any) {
    }
}
