import {UserEntity} from "../../../entity/userEntity";
import {pinus} from "pinus";
import {AppAttr} from "../../../constant/app";
import {DataSource} from "typeorm";
import {Repository} from "typeorm/repository/Repository";
import {PlayerAuthInfo} from "../dto/userDto";

export class UserServices {
    private static _instance: UserServices;
    userRepository: Repository<UserEntity>;

    private constructor() {
        const dataSource: DataSource = pinus.app.get(AppAttr.DataSource);
        this.userRepository = dataSource.getRepository(UserEntity)
    }

    public static getInstance(): UserServices {
        this._instance = this._instance ?? new UserServices();
        return this._instance;
    }

    // 查询或者创建用户
    public async queryOrCreateUser(uid: string, info: PlayerAuthInfo): Promise<UserEntity> {
        let user: UserEntity
        try {
            user = await this.userRepository.findOne({where: {uid: uid}});
        } catch (e) {
            console.error(e)
        }

        if (!user) {
            user = this.userRepository.create({uid: uid, nick: info.nick, cover: info.cover});
            await this.userRepository.save(user);
        }
        return user;
    }

}