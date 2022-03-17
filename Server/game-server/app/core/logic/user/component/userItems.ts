import {AbstractUserComponent} from "./abstractUserComponent";
import {User} from "../user";

export class UserItems extends AbstractUserComponent {
    user: User;

    constructor(user: User) {
        super();
        this.user = user;
    }

    async load(): Promise<void> {

    }

}