import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { JwtSignOptions } from "@nestjs/jwt/dist/interfaces/jwt-module-options.interface";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }


    async validateUser(username: string, password: string): Promise<any> {
        const user = <User>await this.userService.findOne(username);
        if (user && user.password === password) {
            return {
                aid: user.id,
                username: user.username,
                nick: user.username,
                cover: user.cover,
            };
        }
        return null;
    }

    async login(user: any, options?: JwtSignOptions) {
        return {
            access_token: this.jwtService.sign(user, options),
            username: user.username,
        };
    }

    decode(token: string) {
        return this.jwtService.decode(token);
    }

}
