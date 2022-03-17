import {UserItems} from "./component/userItems";

export class User {
    uid: string;

    userItems: UserItems = new UserItems(this);

    private constructor(uid: string) {
        this.uid = uid;
    }

    async load() {
        await this.userItems.load();
    }

    public static async login(uid: string): Promise<User> {
        const user = new User(uid);
        await user.load();
        return user;
    }

    async saveUser() {

    }

    async loadUser() {

    }
}