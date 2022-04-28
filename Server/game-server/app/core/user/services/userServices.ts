import {UserEntity} from "../../../entity/userEntity";
import {pinus} from "pinus";
import {AppAttr} from "../../../constant/App";
import {DataSource} from "typeorm";
import {Repository} from "typeorm/repository/Repository";
import {PlayerLoginRequestDto} from "../../../constant/RpcDto";

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
    public async queryOrCreateUser(info: PlayerLoginRequestDto,): Promise<UserEntity> {
        let user: UserEntity = await this.userRepository.findOne({where: {aid: info.aid}})
        if (!user) {
            user = this.userRepository.create({aid: info.aid, nick: info.nick, cover: info.cover});
            user = await this.userRepository.save(user);
        }
        return user;
    }

}