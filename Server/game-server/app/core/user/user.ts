import {UserEntity} from "../../entity/userEntity";
import {UserServices} from "./services/userServices";
import {pinus} from "pinus";
import {FastDto, fromJSON, Serialize, toDto} from "../../helper/jsonHelper";

enum DtoEnum {
    OnLoginDto = 1,
    RoomNeedDto,
}

export class User {
    userServices: UserServices;

    @FastDto({enumKey: [DtoEnum.RoomNeedDto]})
    sid: number = 0; // sessionId

    @FastDto({enumKey: [DtoEnum.RoomNeedDto]})
    fid: string = "" // frontendId

    @Serialize({type: "string"})
    @FastDto({enumKey: [DtoEnum.OnLoginDto, DtoEnum.RoomNeedDto]})
    uid: string;

    @Serialize()
    @FastDto({enumKey: [DtoEnum.OnLoginDto, DtoEnum.RoomNeedDto]})
    nick: string

    @Serialize()
    @FastDto({enumKey: [DtoEnum.OnLoginDto, DtoEnum.RoomNeedDto]})
    level: number

    @Serialize()
    @FastDto({enumKey: [DtoEnum.OnLoginDto, DtoEnum.RoomNeedDto]})
    money: number

    @Serialize()
    @FastDto({enumKey: [DtoEnum.OnLoginDto, DtoEnum.RoomNeedDto]})
    gold: number

    @Serialize()
    @FastDto({enumKey: [DtoEnum.OnLoginDto, DtoEnum.RoomNeedDto]})
    cover: string


    // 从entity 中load 用户
    public static loadFromEntity = (entity: UserEntity) => new User(entity);

    private constructor(entity: UserEntity) {
        fromJSON(this, entity);
        this.userServices = UserServices.getInstance();
    }


    // 生成玩家登陆成功的电文内容
    public makeOnLoinSuccessMessage(): any {
        return {
            attr: toDto(this, DtoEnum.OnLoginDto)
        }
    }

    // 生成房间需要的玩家信息
    public async makeRoomNeed(): Promise<any> {
        return {
            user: toDto(this, DtoEnum.RoomNeedDto)
        };
    }

    // 给玩家推送消息
    public pushMessage(route: string, msg: any, opts?: any, cb?: (err?: Error, result?: void) => void) {
        const persons = [{sid: this.fid, uid: this.uid.toString()}]
        pinus.app.channelService.pushMessageByUids(route, msg, persons, opts, cb)
    }


}