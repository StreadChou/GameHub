import {
    _decorator,
    Component,
    Node,
    Label,
    loader,
    SpriteAtlas,
    Prefab,
    instantiate,
    assetManager,
    Sprite,
    Layout,
    UITransform,
    director
} from 'cc';
import {NetworkManager} from "db://assets/Script/core/src/network/NetworkManager";
import {GamePushRoute, RoomPushRoute} from "db://assets/Script/core/constant/Route";
import {User} from "db://assets/Script/core/src/user/User";
import {Room} from "db://assets/Script/core/src/room/Room";
import {poker} from "db://assets/Script/app/poker";

const {ccclass, property} = _decorator;

@ccclass('GameHandler')
export class GameHandler extends Component {
    private network: NetworkManager


    @property(Node)
    startGameButton: Node = null;

    @property(Node)
    seatSelfCard: Node = null;

    @property(Node)
    seatIndex1Card: Node = null;

    @property(Node)
    seatIndex2Card: Node = null;

    @property(Node)
    seatSelfRemove: Node = null;

    @property(Node)
    seatIndex1Remove: Node = null;

    @property(Node)
    seatIndex2Remove: Node = null;


    @property(Prefab)
    pokerPrefab: Prefab = null;


    @property(Prefab)
    passPrefab: Prefab = null;

    @property(Node)
    RoundCtrl: Node = null;

    @property(Node)
    PassButton: Node = null;


    pokerAtlas: SpriteAtlas = null;

    user: User;
    room: Room;


    onLoad() {
        this.user = User.getInstance();
        this.room = Room.getInstance();
        // assetManager.loadBundle()
        // assetManager.loadBundle("resources", (error, res) => {
        //     if (error) {
        //         console.error(error);
        //     }
        //     res.load("common/poker", SpriteAtlas, (error, res) => {
        //         if (error) {
        //             console.error(error);
        //         }
        //         this.pokerAtlas = res;
        //     })
        // })
        loader.loadRes("common/poker", SpriteAtlas, (error, res) => {
            if (error) {
                console.error(error);
            }
            this.pokerAtlas = res;
        })


        this.network = NetworkManager.getInstance();
        this.network.listenRoute(GamePushRoute.OnPhase, this.onGamePhase.bind(this))
        this.network.listenRoute(GamePushRoute.OnReceivedPoker, this.OnReceivedPoker.bind(this))
        this.network.listenRoute(GamePushRoute.OnPlayerRound, this.OnPlayerRound.bind(this))
        this.network.listenRoute(GamePushRoute.OnPlayerPlay, this.OnPlayerPlay.bind(this))
    }


    onGamePhase(route: string, data: any, info: any) {
        if (data.phase == 1) {
            this.startGameButton.active = false;
        }
        if (data.phase == 2) {
            this.seatSelfCard.active = true;
            this.seatIndex1Card.active = true;
            this.seatIndex2Card.active = true;
        }
        if (data.phase == 4) {
            this.startGameButton.active = true;
            this.seatSelfCard.active = false;
            this.seatIndex1Card.active = false;
            this.seatIndex2Card.active = false;

            this.seatSelfRemove.removeAllChildren()
            this.seatIndex1Remove.removeAllChildren()
            this.seatIndex2Remove.removeAllChildren()

            this.RoundCtrl.active = false;
            this.seatSelfCard.removeAllChildren();
            this.seatIndex1Card.getChildByName("number").getComponent(Label).string = `0`;
            this.seatIndex2Card.getChildByName("number").getComponent(Label).string = `0`;
        }
    }

    OnReceivedPoker(route: string, data: any, info: any) {
        if (data.uid == this.user.uid) {
            this.AddCardToNode(this.seatSelfCard, data.cards);
            this.ResetCardInNode(this.seatSelfCard);
            setTimeout(() => {
                let arr: Array<Node> = [];
                // 先让所有的牌扣起来.
                for (let child of this.seatSelfCard.children) {
                    child.getComponent(poker).useBackFrame();
                    arr.push(child)
                }
                arr = arr.sort((eleA, eleB) => {
                    return eleB.getComponent(poker).rank - eleA.getComponent(poker).rank
                })

                setTimeout(() => {
                    this.seatSelfCard.removeAllChildren();
                    for (let _node of arr) {
                        _node.getComponent(poker).useNormalFrame();
                        this.seatSelfCard.addChild(_node)
                    }
                    this.ResetCardInNode(this.seatSelfCard);
                }, 0.5 * 1000)
                // 排序.
            }, 0.5 * 1000);
        } else {
            const player = this.room.playerUidMap[data.uid];
            if (!player) return;
            const index = player.index;
            const cardNode = (this[`seatIndex${index}Card`] as Node)
            cardNode.active = true;
            cardNode.getChildByName("number").getComponent(Label).string = data.number;
        }

        if (Object.keys(this.room.playerSeatMap).length <= 2) {
            this.seatIndex2Card.getChildByName("number").getComponent(Label).string = `15`;
        }
    }

    OnPlayerRound(route: string, data: any, info: any) {
        console.log("round", (data.uid == this.user.uid));
        this.RoundCtrl.active = (data.uid == this.user.uid);
        if (data.uid == this.user.uid) {
            this.seatSelfRemove.removeAllChildren();
        }

        if (!data.lastCards || data.lastCards.length <= 0) {
            // 清空所有牌面上的信息, 玩家门前的牌的信息
            this.seatSelfRemove.removeAllChildren();
            this.seatIndex1Remove.removeAllChildren();
            this.seatIndex2Remove.removeAllChildren();
            this.PassButton.active = false;
        } else {
            this.PassButton.active = true;
        }

    }

    OnPlayerPlay(route: string, data: any, info: any) {
        const player = this.room.playerUidMap[data.uid];
        if (!player) return;
        const index = player.index;
        let removeNode: Node;
        let cardNode: Node;
        if (index == 0) {
            removeNode = this.seatSelfRemove
            cardNode = this.seatSelfCard
        } else {
            removeNode = (this[`seatIndex${index}Remove`] as Node)
            cardNode = (this[`seatIndex${index}Card`] as Node);
        }
        if (!removeNode) return;
        removeNode.removeAllChildren();

        if (!data.cards || data.cards.length <= 0) {
            const pokerNode = instantiate(this.passPrefab);
            pokerNode.setParent(removeNode);
            return;
        }

        this.AddCardToNode(removeNode, data.cards, 0.6);
        this.ResetCardInNode(removeNode, 30);

        if (data.uid == this.user.uid) {
            this.RemoveCardsFromNode(cardNode, data.cards);
        } else {
            let cardsNumber = cardNode.getChildByName("number").getComponent(Label).string
            cardNode.getChildByName("number").getComponent(Label).string = (parseInt(cardsNumber) - data.cards.length).toString()
        }
    }

    AddCardToNode(node: Node, cards, scale = 1) {
        for (let card of cards) {
            const pokerNode = instantiate(this.pokerPrefab);
            pokerNode.setParent(node);
            pokerNode.setScale(scale, scale);
            pokerNode.getComponent(UITransform).setAnchorPoint(0, 0);
            pokerNode.addComponent(poker);
            const pokerComp = pokerNode.getComponent(poker)

            const name = `card_${card.suit}_${card.rank}`
            const normal = this.pokerAtlas.getSpriteFrame(name);
            const back = this.pokerAtlas.getSpriteFrame("card_6_1");

            pokerComp.setCard(card);
            pokerComp.setSpriteFrame(normal, back);
            pokerComp.useNormalFrame();
            // pokerComp.spriteFrame = normal;
        }
    }

    RemoveCardsFromNode(node: Node, cards, ReInterval = 50) {
        for (let card of cards) {
            for (let child of node.children) {
                const pokerComp = child.getComponent(poker)
                if (pokerComp.value == card.value) {
                    node.removeChild(child);
                }
            }
        }
        this.ResetCardInNode(node, ReInterval);
    }

    ResetCardInNode(node: Node, interval = 50) {
        const first = node.children[0];
        if (!first) return;
        const cardNumber = node.children.length;

        const width = node.getComponent(UITransform).width;
        const childPerWidth = first.getComponent(UITransform).width;
        const allWidth = childPerWidth + (interval * (cardNumber - 1));
        first.setPosition(((width - allWidth) / 2), first.position.y);


        for (let index in node.children) {
            if (parseInt(index) == 0) continue;
            node.children[index].setPosition(first.position.x + (parseInt(index) * interval), first.position.y);
        }
    }


    RoundPass() {
        this.network.request("room.roomHandler.pass", {roomId: this.room.roomId});
    }


    RoundPlay() {
        const cards = [];
        for (let child of this.seatSelfCard.children) {
            const pokerComp = child.getComponent(poker)
            if (pokerComp.state == 1) {
                cards.push({
                    suit: pokerComp.suit,
                    rank: pokerComp.rank,
                    value: pokerComp.value
                })
            }
        }
        const message = {
            roomId: this.room.roomId,
            cards: cards,
        }
        console.log(message);
        this.network.request("room.roomHandler.play", message);
    }
}
