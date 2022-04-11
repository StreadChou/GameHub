import {UserEntity} from "../../entity/userEntity";
import {UserServices} from "./services/userServices";
import {RoomPlayerInitDto} from "../room/dto/RoomDto";
import {pinus} from "pinus";
import {PlayerPushRoute} from "../../constant/Route";
import {PlayerLoginDto} from "./dto/userDto";

export class User {
    uid: string = ""; // 用户名
    nick: string = ""; // 昵称
    level: number = 1;
    money: number = 0;
    cover: string = "";

    sid: number = 0; // sessionId
    fid: string = "" // frontendId

    userServices: UserServices;

    // 从entity 中load 用户
    public static loadFromEntity = (entity: UserEntity) => new User(entity);

    private constructor(entity: UserEntity) {
        Object.assign(this, entity);
        this.userServices = UserServices.getInstance();
    }


    public async login() {
        const message: PlayerLoginDto = {
            uid: this.uid,
            nick: this.nick,
            level: this.level,
            money: this.money,
        }
        this.pushMessage(PlayerPushRoute.OnLogin, message);
    }

    public async makeLoginNeed() {

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
        const persons = [{sid: this.fid, uid: this.uid}]
        pinus.app.channelService.pushMessageByUids(route, msg, persons, opts, cb)
    }


}