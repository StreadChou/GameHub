import RolePoolManager from "../../Logic/Game/Manager/RolePoolManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PokerComp extends cc.Component {
    suit: number;
    rank: number;
    value: number;

    select: boolean = false;


    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.onPokerClick();
        }, this)
    }

    onPokerClick() {
        if (this.select == false) {
            this.node.setPosition(this.node.position.x, this.node.position.y + 20)
            this.select = true;
        } else {
            this.node.setPosition(this.node.position.x, this.node.position.y - 20)
            this.select = false;
        }
    }

    setEntity(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }

    useNormalFrame() {
        this.node.getComponent(cc.Sprite).spriteFrame = RolePoolManager.instance.getPokerSpriteFrame(this.suit, this.rank);
    }

    useBackFrame() {
        this.node.getComponent(cc.Sprite).spriteFrame = RolePoolManager.instance.getPokerSpriteFrame(6, 1);
    }


}
