import {LogicProxy} from "../../../servers/logic/proxy/logicProxy";
import {ErrorCode} from "../../../constant/ErrorCode";
import {pinus} from "pinus";
import {ClientException} from "../../../exception/clientException";

export class RoomPlayer {
    uid: string = "";
    nick: string = ""; // 昵称
    level: number = 1;
    money: number = 0;
    cover: string = "";

    sid: number = 0;
    fid: string = ""
    vip: boolean = false;

    master: boolean = false;
    seat: number;


    private constructor(uid) {
        this.uid = uid;
    }

    static async getInstanceByUid(uid: string): Promise<RoomPlayer> {
        let roomPlayer = new RoomPlayer(uid);
        let userInfo: any = await LogicProxy.getInstance().generateRoomPlayer(uid);
        Object.assign(roomPlayer, userInfo);
        return roomPlayer;
    }

    public async checkCanKickPlayer(targetPlayer: RoomPlayer): Promise<void> {
        if (!this.master) throw new ClientException(ErrorCode.NotRoomMaster, {}, "不是房主, 无法操作");
        if (targetPlayer.vip) throw new ClientException(ErrorCode.CantKickVipPlayer, {}, "对方是VIP玩家, 无法操作");
    }

    public pushMessage(route: string, msg: any, opts?: any, cb?: (err?: Error, result?: void) => void) {
        const persons = [{sid: this.fid, uid: this.uid}]
        pinus.app.channelService.pushMessageByUids(route, msg, persons, opts, cb)
    }

    public makeClientData(): any {
        return {
            uid: this.uid,
            seat: this.seat,
            nick: this.nick,
            level: this.level,
            money: this.money,
            cover: this.cover,
        }
    }

}