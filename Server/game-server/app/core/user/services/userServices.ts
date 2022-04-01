export class UserServices {
    private static _instance: UserServices;

    private constructor() {
    }

    public static getInstance(): UserServices {
        this._instance = this._instance ?? new UserServices();
        return this._instance;
    }

    // 查询或者创建用户
    public static queryOrCreateUser(uid: string) {

    }

}