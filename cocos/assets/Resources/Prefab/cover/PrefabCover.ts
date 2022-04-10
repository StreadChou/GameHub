import {_decorator, Component, Node, Sprite} from 'cc';
import {User} from "db://assets/Script/core/src/user/User";

const {ccclass, property} = _decorator;


@ccclass('prefabCover')
export class prefabCover extends Component {
    @property(Sprite)
    cover: Sprite = null;

    start() {
        // const user = User.getInstance();
        // console.log(user.cover)
    }


}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
