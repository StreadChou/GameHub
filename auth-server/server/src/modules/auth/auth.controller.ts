import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckTokenDto, LoginDto, RegisterDto } from "./auth.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { randomNumberBetween } from "../../helper/randomHelper";

@Controller('auth')
@ApiTags('认证')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request, @Body() body: LoginDto) {
    const user = request.user;
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  async register(@Body() body: RegisterDto) {
    if (!body.cover) {
      const covers = fs.readdirSync(
        path.join(__dirname, '..', '..', '..', 'public', 'static', 'cover'),
      );
      const cover = covers[randomNumberBetween(0, covers.length - 1)];

      body.cover = this.configService.get('APP_URL') + `static/cover/${cover}`;
    }
    return this.userService.register(body);
  }

  @Post('checkToken')
  public async checkToken(@Body() body: CheckTokenDto) {
    return this.authService.decode(body.token);
  }
}
