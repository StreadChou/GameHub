import {Role} from "../../Logic/Game/Component/Role";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PokerGamePlayer extends cc.Component {
    role: Role

    @property(cc.Node)
    nickNode: cc.Node = null;

    @property(cc.Node)
    moneyNode: cc.Node = null;

    @property(cc.Sprite)
    coverSprint: cc.Sprite = null;

    @property(cc.Node)
    timer: cc.Node = null;

    @property(cc.Node)
    card: cc.Node = null;


    start() {
        this.nickNode.getComponent(cc.Label).string = this.role.nick;
        this.moneyNode.getComponent(cc.Label).string = this.role.money.toString();
        // this.coverSprint.spriteFrame = this.role.nick;
    }

    setPlayer(role: Role) {
        this.role = role;
    }
}
