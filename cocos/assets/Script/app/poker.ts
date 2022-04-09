import {_decorator, Component, Node, systemEvent, Sprite} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('poker')
export class poker extends Component {

    suit: number;
    rank: number;
    value: number;


    state = 0;
    frame;
    backFrame;

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, (event) => {
            this.onPokerClick();
        }, this)
    }

    onPokerClick() {
        if (this.state == 0) {
            this.node.setPosition(this.node.position.x, this.node.position.y + 20)
            this.state = 1;
        } else {
            this.node.setPosition(this.node.position.x, this.node.position.y - 20)
            this.state = 0;
        }
    }

    setCard(card) {
        const {suit, rank, value} = card;
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }

    setSpriteFrame(frame, backFrame) {
        this.frame = frame;
        this.backFrame = backFrame;
    }

    useBackFrame() {
        this.node.getComponent(Sprite).spriteFrame = this.backFrame;
    }

    useNormalFrame(){
        this.node.getComponent(Sprite).spriteFrame = this.frame;
    }


    // update (deltaTime: number) {
    //     // [4]
    // }
}
