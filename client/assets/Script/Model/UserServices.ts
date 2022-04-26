import {ProtocolBase} from "../Base/ProtocolBase";
import {Client2ServerCmd, PlayerPushRoute} from "../Constant/Route";
import {RequestResponseDto} from "../Constant/ClientDto/RequestResponseDto";
import {ControllerLogic} from "../Controller/Logic/ControllerLogic";

export class UserServices extends ProtocolBase {
    protected static _instance: UserServices;
    protected userEntity: UserEntity;

    public static get instance() {
        this._instance = this._instance ?? new UserServices();
        return this._instance;
    }

    // 获取用户
    public static get user(): UserEntity {
        return this.instance.userEntity;
    }

    // 初始化监听
    protected initProtocols() {
        this.initProtocol(PlayerPushRoute.OnLogin, this.OnLogin.bind(this));
    }

    // 登录
    sendLoginMessage(message: RequestResponseDto[Client2ServerCmd.Login]["request"]) {
        this.sendMsg(Client2ServerCmd.Login, message);
    }

    // 登录之后
    protected OnLogin(msg: any) {
        this.userEntity = new UserEntity(msg);
        ControllerLogic.getInstance().onLoginSuccess();
    }
}

export class UserEntity {

    constructor(userInfo: any) {
        Object.assign(userInfo);
    }
}