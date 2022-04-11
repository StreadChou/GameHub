import {Role} from "../../Logic/Game/Component/Role";
import Vec2 = cc.Vec2;
import Label = cc.Label;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PokerGamePlayer extends cc.Component {
    role: Role

    @property(cc.Node)
    pokerNode: cc.Node = null;

    @property(cc.Node)
    nickNode: cc.Node = null;

    @property(cc.Node)
    moneyNode: cc.Node = null;

    @property(cc.Node)
    coverNode: cc.Node = null;

    @property(cc.Node)
    timeNode: cc.Node = null;

    @property(cc.Node)
    foldNode: cc.Node = null;


    @property(cc.Node)
    timer: cc.Node = null;

    @property(cc.Label)
    time: cc.Label = null;

    @property(cc.Label)
    pokerNumber: cc.Label = null;


    start() {
        this.nickNode.getComponent(cc.Label).string = this.role.nick;
        this.moneyNode.getComponent(cc.Label).string = this.role.money.toString();
        // this.coverSprint.spriteFrame = this.role.nick;
    }

    setPlayer(role: Role) {
        this.role = role;
    }

    useLeftLayout() {
        this.pokerNode.setPosition(new Vec2(112, 46))
        this.coverNode.setPosition(new Vec2(40, 50))

        this.nickNode.setPosition(new Vec2(40, -10))
        this.nickNode.getComponent(Label).horizontalAlign = Label.HorizontalAlign.CENTER

        this.moneyNode.setPosition(new Vec2(40, -40))
        this.moneyNode.getComponent(Label).horizontalAlign = Label.HorizontalAlign.CENTER

        this.timeNode.setPosition(new Vec2(210, 47))
        this.foldNode.setPosition(new Vec2(310, 47))
    }

    useRightLayout() {
        this.pokerNode.setPosition(new Vec2(-115, 45))
        this.coverNode.setPosition(new Vec2(-43, 50))

        this.nickNode.setPosition(new Vec2(-40, -10))
        this.nickNode.getComponent(Label).horizontalAlign = Label.HorizontalAlign.CENTER

        this.moneyNode.setPosition(new Vec2(-50, -40))
        this.moneyNode.getComponent(Label).horizontalAlign = Label.HorizontalAlign.CENTER

        this.timeNode.setPosition(new Vec2(-210, 47))
        this.foldNode.setPosition(new Vec2(-310, 47))
    }

    useTopLayOut() {
        this.pokerNode.setPosition(new Vec2(-115, 45))
        this.coverNode.setPosition(new Vec2(-43, 50))

        this.nickNode.setPosition(new Vec2(72, 67))
        this.nickNode.getComponent(Label).horizontalAlign = Label.HorizontalAlign.LEFT

        this.moneyNode.setPosition(new Vec2(72, 34))
        this.moneyNode.getComponent(Label).horizontalAlign = Label.HorizontalAlign.LEFT

        this.timeNode.setPosition(new Vec2(0, -43))
        this.foldNode.setPosition(new Vec2(0, -43))
    }
}
