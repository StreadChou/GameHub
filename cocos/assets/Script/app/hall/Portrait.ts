import {_decorator, Component, Node, Label, Sprite, game} from 'cc';
import {User} from "db://assets/Script/core/src/user/User";

const {ccclass, property} = _decorator;


@ccclass('Portrait')
export class Portrait extends Component {
    @property(Label)
    id: Label = null;

    @property(Label)
    nick: Label = null;

    @property(Sprite)
    avatar: Sprite = null;

    @property(Label)
    money: Label = null;

    @property(Label)
    level: Label = null;

    start() {
        console.log(game);
        this.updateUserInfo();
        console.log(this);
    }

    updateUserInfo() {
        const user = User.getInstance();
        // this.id.string = user.uid;
        this.nick.string = user.nick;
        this.money.string = user.money.toString();
        this.level.string = `LV ${user.level}`;
    }

}
