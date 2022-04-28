import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({description: "用户名"})
    username: string;

    @ApiProperty({description: "密码"})
    password: string;

}


export class RegisterDto {
    @ApiProperty({description: "用户名"})
    username: string;

    @ApiProperty({description: "密码"})
    password: string;

    @ApiProperty({description: "手机号"})
    phone: string;

    @ApiProperty({description: "头像"})
    cover?: string;
}

export class CheckTokenDto {
    @ApiProperty({description: "TOKEN"})
    token: string;
}