import {_decorator, Component, Node, EditBox, BaseNode, director} from 'cc';
import {NetworkManager} from "db://assets/Script/core/src/network/NetworkManager";
import {PlayerPushRoute} from "db://assets/Script/core/constant/Route";
import {User} from "db://assets/Script/core/src/user/User";
import {randomNumberBetween} from "db://assets/Script/src/helper/randomHelper";

const {ccclass, property} = _decorator;

@ccclass('LoginHandler')
export class LoginHandler extends Component {
    private network: NetworkManager = NetworkManager.getInstance();

    onLoad() {
        this.network.listenRoute(PlayerPushRoute.OnLogin, this.onLogin.bind(this))
        director.preloadScene("hall")
    }



    onLogin(route: string, data: any, info: any) {
        const user = User.getInstance(data);
        director.loadScene("hall");
    }


    guestLogin() {
        const uid = randomNumberBetween(100000, 999999).toString();
        const token = randomNumberBetween(10000000, 99999999).toString()
        this.network.request("connector.entryHandler.login", {uid, token});
    }

}
