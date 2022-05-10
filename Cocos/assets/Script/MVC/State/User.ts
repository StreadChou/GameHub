export class User {
    private static _instance: User;

    private constructor() {
        // 单例
    }

    public static get instance(): User {
        this._instance = this._instance ?? new User();
        return this._instance;
    }


}