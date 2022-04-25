import {ProtocolBase} from "../../../Base/ProtocolBase";
import {RequestResponseDto} from "../../../Constant/ClientDto/RequestResponseDto";
import {Client2ServerCmd, PlayerPushRoute} from "../../../Constant/Route";

export class PlayerProtocol extends ProtocolBase {
    constructor() {
        super();
    }

    protected initProtocols() {
        this.initProtocol(PlayerPushRoute.OnLogin, this.OnLogin.bind(this));
    }


    sendLoginMessage(message: RequestResponseDto[Client2ServerCmd.Login]["request"]) {
        this.sendMsg(Client2ServerCmd.Login, message);
    }

    protected OnLogin(msg: any) {

    }

}