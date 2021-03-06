import {ProtocolBase} from "../Base/ProtocolBase";
import {Client2ServerCmd, PlayerPushRoute} from "../Constant/Route";
import {ControllerLogic} from "../Controller/Logic/ControllerLogic";
import {fromJSON, Serialize} from "../Base/Helper/jsonHelper";

export class UserServices extends ProtocolBase {
    protected static _instance: UserServices;
    protected userEntity: UserEntity;


    public static get instance() {
        if (!this._instance) {
            this._instance = new UserServices();
            this._instance.addProtocols();
        }
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

    // 游客登录
    requestGuestLogin(message: any) {
        this.sendMsg(Client2ServerCmd.GuestLogin, message);
    }

    requestTokenLogin(message: any) {
        this.sendMsg(Client2ServerCmd.TokenLogin, message);
    }

    // 登录之后
    protected OnLogin(message: any) {
        this.userEntity = new UserEntity(message.attr);
        console.log(this.userEntity);
        ControllerLogic.getInstance().onLoginSuccess();
    }
}

export class UserEntity {
    @Serialize({type: "string"})
    uid: string;

    @Serialize()
    nick: string

    @Serialize()
    level: number

    @Serialize()
    money: number

    @Serialize()
    gold: number

    @Serialize()
    cover: string

    constructor(userInfo: any) {
        fromJSON(this, userInfo)
    }
}