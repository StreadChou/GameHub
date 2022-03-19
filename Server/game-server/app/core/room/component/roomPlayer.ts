import {LogicProxy} from "../../../servers/logic/proxy/logicProxy";
import {RoomPlayerInitDto} from "../dto/RoomDto";

export class RoomPlayer {
    uid: string = "";

    private constructor(uid) {
        this.uid = uid;
    }

    static async getInstanceByUid(uid: string): Promise<RoomPlayer> {
        let roomPlayer = new RoomPlayer(uid);
        let userInfo: RoomPlayerInitDto = LogicProxy.getInstance().generateRoomPlayer(uid);
        Object.assign(roomPlayer, userInfo);
        return roomPlayer;
    }
}