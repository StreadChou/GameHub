import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {RegisterDto} from "./auth.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
    }

    async findOne(username: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                username: username,
            }
        });
    }

    async register(body: RegisterDto): Promise<User> {
        let entity = this.userRepository.create(body);
        entity = await this.userRepository.save(entity);
        return entity;
    }
}
