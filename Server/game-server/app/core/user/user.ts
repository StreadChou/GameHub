import {UserEntity} from "../../entity/userEntity";
import {UserServices} from "./services/userServices";
import {pinus} from "pinus";
import {RoomPlayerInitDto} from "../../constant/RpcDto";
import {S2COnLogin} from "../../servers/vo";

export class User {
    uid: string;
    nick: string
    level: number
    money: number
    cover: string

    sid: number = 0; // sessionId
    fid: string = "" // frontendId

    userServices: UserServices;

    // 从entity 中load 用户
    public static loadFromEntity = (entity: UserEntity) => new User(entity);

    private constructor(entity: UserEntity) {
        this.uid = entity.uid.toString();
        this.nick = entity.nick;
        this.level = entity.level;
        this.money = entity.money;
        this.cover = entity.cover;

        this.userServices = UserServices.getInstance();
    }


    // 生成玩家登陆成功的电文内容
    public makeOnLoinSuccessMessage(): S2COnLogin {
        return {
            attr: {
                uid: this.uid,
                nick: this.nick,
                level: this.level,
                money: this.money,
            }
        }
    }

    public async makeRoomNeed(): Promise<RoomPlayerInitDto> {
        return {
            uid: this.uid,
            nick: this.nick,
            level: this.level,
            money: this.money,
            cover: this.cover,

            sid: this.sid,
            fid: this.fid,
        };
    }

    public pushMessage(route: string, msg: any, opts?: any, cb?: (err?: Error, result?: void) => void) {
        const persons = [{sid: this.fid, uid: this.uid.toString()}]
        pinus.app.channelService.pushMessageByUids(route, msg, persons, opts, cb)
    }


}