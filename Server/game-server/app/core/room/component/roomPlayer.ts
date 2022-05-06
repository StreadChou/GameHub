import {LogicProxy} from "../../../servers/logic/proxy/logicProxy";
import {ErrorCode} from "../../../constant/ErrorCode";
import {pinus} from "pinus";
import {ClientException} from "../../../exception/clientException";
import {AbstractRoom} from "../room/abstractRoom";
import {FastDto, fromJSON, Serialize, toDto} from "../../../helper/jsonHelper";


enum DtoEnum {
    RoomPlayer = 1,
}

export class RoomPlayer {
    @FastDto({enumKey: [DtoEnum.RoomPlayer]})
    @Serialize({type: "string"})
    uid: string;

    @FastDto({enumKey: [DtoEnum.RoomPlayer]})
    @Serialize()
    nick: string

    @FastDto({enumKey: [DtoEnum.RoomPlayer]})
    @Serialize()
    level: number

    @FastDto({enumKey: [DtoEnum.RoomPlayer]})
    @Serialize()
    money: number

    @FastDto({enumKey: [DtoEnum.RoomPlayer]})
    @Serialize()
    cover: string

    @Serialize()
    sid: number = 0; // sessionId
    @Serialize()
    fid: string = "" // frontendId

    @FastDto({enumKey: [DtoEnum.RoomPlayer]})
    seat: number;


    private constructor(uid) {
        this.uid = uid;
    }

    static async getInstanceByUid(uid: string): Promise<RoomPlayer> {
        let roomPlayer = new RoomPlayer(uid);
        let red: any = await LogicProxy.getInstance().generateRoomPlayer(uid);
        fromJSON(roomPlayer, red.user);
        return roomPlayer;
    }


    // 检查是否可以创建房间
    public async checkCanCreateRoom() {

    }

    public async checkCanJoinRoom(room: AbstractRoom) {

    }

    public async checkCanKickPlayer(targetPlayer: RoomPlayer): Promise<void> {

    }


    public pushMessage(route: string, msg: any, opts?: any, cb?: (err?: Error, result?: void) => void) {
        const persons = [{sid: this.fid, uid: this.uid}]
        pinus.app.channelService.pushMessageByUids(route, msg, persons, opts, cb)
    }

    makeClientData = () => toDto(this, DtoEnum.RoomPlayer)
}