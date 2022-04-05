export class User {
    private static _instance: User;
    uid: string = ""; // 用户名
    nick: string = ""; // 昵称
    level: number = 1;
    money: number = 0;
    cover: string = "";

    private constructor() {
    }

    public static getInstance(onLoginData?: any) {
        this._instance = this._instance ?? new User()
        if (onLoginData) Object.assign(this._instance, onLoginData);
        return this._instance;
    }
}