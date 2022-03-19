import {LogicProxy} from "../../../servers/logic/proxy/logicProxy";
import {RoomPlayerInitDto} from "../dto/RoomDto";
import {RequestParamsException} from "../../../exception/RequestParamsException";
import {ErrorCode} from "../../../constant/ErrorCode";

export class RoomPlayer {
    uid: string = "";
    master: boolean = false;
    vip: boolean = false;

    private constructor(uid) {
        this.uid = uid;
    }

    static async getInstanceByUid(uid: string): Promise<RoomPlayer> {
        let roomPlayer = new RoomPlayer(uid);
        let userInfo: RoomPlayerInitDto = LogicProxy.getInstance().generateRoomPlayer(uid);
        Object.assign(roomPlayer, userInfo);
        return roomPlayer;
    }

    public async checkCanKickPlayer(targetPlayer: RoomPlayer): Promise<void> {
        if (!this.master) throw new RequestParamsException(ErrorCode.NOT_ROOM_MASTER);
        if (targetPlayer.vip) throw new RequestParamsException(ErrorCode.CANT_KICK_VIP_PLAYER);
    }

}