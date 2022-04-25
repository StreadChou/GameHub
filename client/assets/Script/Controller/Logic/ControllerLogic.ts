import Login from "../../View/Login/Login";
import {User} from "../../Model/User";

export class ControllerLogic {
    private static _instance: ControllerLogic;
    component: Login;

    constructor(component?: Login) {
        this.component = component;
    }

    public static getInstance(component?: Login) {
        if (this._instance) return this._instance;
        this._instance = new ControllerLogic(component);
        return this._instance;
    }

    public guestLogin() {
        const uid = randomNumberBetween(100000, 999999).toString();
        const token = randomNumberBetween(10000000, 99999999).toString()
        let msg = {uid, token};

        User.Login(msg);
        this.component.onLoginSuccess();
    }
}