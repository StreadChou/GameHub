import {Role} from "../../Logic/Game/Component/Role";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoomPlayer extends cc.Component {
    role: Role

    @property(cc.Label)
    nickLabel: cc.Label = null;

    @property(cc.Label)
    moneyLabel: cc.Label = null;

    @property(cc.Sprite)
    coverSprint: cc.Sprite = null;


    start() {
        this.nickLabel.string = this.role.nick;
        this.moneyLabel.string = this.role.money.toString();
        // this.coverSprint.spriteFrame = this.role.nick;
    }

    setPlayer(role: Role) {
        this.role = role;
    }
}
