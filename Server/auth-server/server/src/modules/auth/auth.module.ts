import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AppConstant} from "../../constant/app.constant";
import {UserService} from "./user.service";
import {LocalStrategy} from "./rbac/local.strategy";
import {JwtStrategy} from "./rbac/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: AppConstant.JWT_SECRET,
            signOptions: {expiresIn: AppConstant.JWT_EXPIRE},
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        LocalStrategy, JwtStrategy
    ]
})
export class AuthModule {
}
