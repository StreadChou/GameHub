import Login from "../../View/Login/Login";
import {UserServices} from "../../Model/UserServices";
import axios from "axios";


export class ControllerLogic {
    private static _instance: ControllerLogic;

    get loginComponent(): Login {
        return Login.instance;
    }

    public static getInstance() {
        this._instance = this._instance ?? new ControllerLogic();
        return this._instance;
    }


    async loginToAuth(form: any) {
        axios.post("http://127.0.0.1:3000/auth/login", form).then((response) => {
            const {access_token} = response.data;
            this.tokenLogin(access_token)
        })

    }

    async registerToAuth(form: any) {
        axios.post("http://127.0.0.1:3000/auth/register", form).then((response) => {
            const {access_token} = response.data;
            this.tokenLogin(access_token)
        })
    }

    public guestLogin() {
        UserServices.instance.requestGuestLogin({});
    }

    public tokenLogin(token: string) {
        UserServices.instance.requestTokenLogin({
            token: token
        });
    }

    public onLoginSuccess() {
        // 通知view我登录成功了
        this.loginComponent.onLoginSuccess();
    }
}