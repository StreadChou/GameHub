export class User {
    private static _instance: User;
    uid: string = "";
    nick: string = "";

    private constructor(onLoginData: any) {
        Object.assign(this, onLoginData);
    }

    public static getInstance(onLoginData?: any) {
        this._instance = this._instance ?? new User(onLoginData)
        return this._instance;
    }
}