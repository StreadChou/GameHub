import Login from "../../View/Login/Login";
import {randomNumberBetween} from "../../Base/Helper/RandomHelper";
import {UserServices} from "../../Model/UserServices";

export class ControllerLogic {
    private static _instance: ControllerLogic;

    get loginComponent(): Login {
        return Login.instance;
    }

    public static getInstance() {
        this._instance = this._instance ?? new ControllerLogic();
        return this._instance;
    }


    public guestLogin() {
        const uid = randomNumberBetween(100000, 999999).toString();
        const token = randomNumberBetween(10000000, 99999999).toString()
        let message = {uid, token};
        UserServices.instance.sendLoginMessage(message);
    }

    public onLoginSuccess() {
        this.loginComponent.onLoginSuccess();
    }
}