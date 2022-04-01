import {UserEntity} from "../../entity/userEntity";
import {UserServices} from "./services/userServices";
import {RoomPlayerInitDto} from "../room/dto/RoomDto";

export class User {
    uid: string = ""; // 用户名
    nick: string = ""; // 昵称

    userServices: UserServices;

    // 从entity 中load 用户
    public static loadFromEntity = (entity: UserEntity) => new User(entity);

    private constructor(entity: UserEntity) {
        Object.assign(this, entity);
        this.userServices = UserServices.getInstance();
    }

    public async makeRoomNeed(): Promise<RoomPlayerInitDto> {
        return {uid: this.uid, nick: this.nick};
    }

}