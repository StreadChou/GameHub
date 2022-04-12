import {ControllerBase} from "../../Base/ControllerBase";
import {RoleManager} from "../Manager/RoleManager";
import {Player} from "../../Player/Player";
import {Role} from "../Component/Role";
import PokerGamePlayer from "../../../Prefab/Game/PokerGamePlayer";
import PokerGameSelf from "../../../Prefab/Game/PokerGameSelf";
import RolePoolManager from "../Manager/RolePoolManager";
import PokerComp from "../../../Prefab/Game/PokerComp";
import PokerGame from "../PokerGame";
import UIGamePoker from "../../../UIScript/Screen/UIGamePoker";

export class RoleController extends ControllerBase {
    roleManager: RoleManager;
    load: boolean = false;

    public constructor() {
        super();
        this.roleManager = new RoleManager();
    }

    onLoadingFinish() {
        this.load = true;
        this.roleManager.onLoadingFinish();
    }

    addRole(roleInfos: Array<any>) {
        roleInfos.forEach(ele => {
            this.roleManager.addRole(ele);
        })
    }

    deleteRole(info: any) {
        this.roleManager.deleteRole(info);
    }

    OnReceivedPoker(message: any) {
        let {uid, number, cards} = message;
        if (uid == Player.instance.uid) {
            const role: Role = this.roleManager.getRole(uid);
            const roleNode = role.node;
            const roleComp = roleNode.getComponent(PokerGameSelf);

            this.AddCardToNode(roleComp.handNode, cards)
            this.ResetCardInNode(roleComp.handNode);

            setTimeout(() => {
                // 先让所有的牌扣起来.
                for (let child of roleComp.handNode.children) {
                    child.getComponent(PokerComp).useBackFrame();
                }

                cards = PokerGame.instance.gameController.cardsSort(cards);
                setTimeout(() => {
                    roleComp.handNode.removeAllChildren();
                    this.AddCardToNode(roleComp.handNode, cards)
                    this.ResetCardInNode(roleComp.handNode);
                }, 0.5 * 1000)

            }, 0.5 * 1000);
        } else {
            const role: Role = this.roleManager.getRole(uid);
            const roleNode = role.node;
            const roleComp = roleNode.getComponent(PokerGamePlayer);
            roleComp.pokerNode.active = true;
            roleComp.pokerNumber.string = number;
        }
    }

    OnPlayerRound(message: any) {
        let {uid, lastCards} = message;
        const role: Role = this.roleManager.getRole(uid);
        const roleNode = role.node;
        // 是否新回合
        const newRound = !lastCards || lastCards.length <= 0;

        // 如果是我的回合
        if (role.uid == this.roleManager.self.uid) {
            // 展示操作按钮, 新回合则不显示跳过按钮
            this.UIShowGameOperate(newRound)
            // 清空我之前出的牌
            const roleComp = roleNode.getComponent(PokerGameSelf);
            roleComp.foldNode.removeAllChildren();
        } else {
            this.UIDisableGameOperate()
        }


        this.roleManager.roleUidMap.forEach((ele) => {
            // 如果是新回合, 清空用户前面出的牌 (第一回合 或者 已经过了一个回合, 都没人要的话,)
            if (newRound) ele.clearFoldCardsNode();

            // 玩家自己处理进入回合的情况
            ele.OnPlayerRound(message);
        })
    }


    OnPlayerPlay(message: any) {
        const {uid, cards} = message

        const role: Role = this.roleManager.getRole(uid);
        role.clearFoldCardsNode();
        const roleNode = role.node;

        // 显示不出
        if (!cards || cards.length <= 0) {
            // const pokerNode = instantiate(this.passPrefab);
            // pokerNode.setParent(removeNode);
            return;
        }

        // 在出牌区域显示牌
        const node = uid == this.roleManager.self.uid ? roleNode.getComponent(PokerGameSelf).foldNode : roleNode.getComponent(PokerGamePlayer).foldNode;
        this.AddCardToNode(node, cards, new cc.Vec2(0.5, 0.5));
        this.ResetCardInNode(node, 30);

        // 如果是我出牌, 需要把我手牌移除
        if (uid == this.roleManager.self.uid) {
            this.RemoveCardsFromNode(roleNode.getComponent(PokerGameSelf).handNode, cards);
        } else {
            // 如果是别人出牌. 移除扣除牌的数量
            let cardsNumber = roleNode.getComponent(PokerGamePlayer).pokerNumber.string;
            roleNode.getComponent(PokerGamePlayer).pokerNumber.string = (parseInt(cardsNumber) - cards.length).toString()
        }
    }

    RemoveCardsFromNode(node: cc.Node, cards, ReInterval = 50) {
        for (let card of cards) {
            for (let child of node.children) {
                const pokerComp = child.getComponent(PokerComp)
                if (pokerComp.value == card.value) {
                    node.removeChild(child);
                }
            }
        }
        this.ResetCardInNode(node, ReInterval);
    }

    AddCardToNode(node: cc.Node, cards, scale?: cc.Vec2) {
        for (let card of cards) {
            const pokerNode = RolePoolManager.instance.getPokerNode();
            if (scale) {
                pokerNode.setScale(scale)
            }
            const pokerComp = pokerNode.getComponent(PokerComp);
            pokerComp.setEntity(card.suit, card.rank, card.value)
            pokerComp.useNormalFrame()

            pokerNode.setParent(node);
        }
    }

    ResetCardInNode(node: cc.Node, interval = 50) {
        const first = node.children[0];
        if (!first) return;
        const cardNumber = node.children.length;

        const width = node.width;
        const childPerWidth = first.width;
        const allWidth = childPerWidth + (interval * (cardNumber - 1));
        first.setPosition(((width - allWidth) / 2), first.position.y);


        for (let index in node.children) {
            if (parseInt(index) == 0) continue;
            node.children[index].setPosition(first.position.x + (parseInt(index) * interval), first.position.y);
        }
    }

    getSelectCards() {
        const cards = [];
        const areaHandsCards = this.roleManager.self.node.getComponent(PokerGameSelf).handNode;
        for (let child of areaHandsCards.children) {
            const pokerComp = child.getComponent(PokerComp)
            if (pokerComp.select) {
                cards.push({
                    suit: pokerComp.suit,
                    rank: pokerComp.rank,
                    value: pokerComp.value
                })
            }
        }
        return cards;
    }


    // 展示用户游戏操作按钮
    UIShowGameOperate(disablePass: boolean) {
        UIGamePoker.inst.view.GameOperate.active = true;
        UIGamePoker.inst.view.Pass.active = !disablePass;
    }

    // 隐藏用户游戏操作按钮
    UIDisableGameOperate() {
        UIGamePoker.inst.view.GameOperate.active = false
    }

    // 隐藏所用用户的倒计时
    UIDisableAllRoundTime() {
        this.roleManager.roleUidMap.forEach((ele) => {
            ele.UIDisableUserRoundTime()
        })
    }

    // 隐藏所用用户的扑克, 手牌和出牌区域
    UIDisableAllCards() {
        this.roleManager.roleUidMap.forEach((ele) => {
            if (ele.self) {
                ele.node.getComponent(PokerGameSelf).foldNode.removeAllChildren()
                ele.node.getComponent(PokerGameSelf).handNode.removeAllChildren()
            } else {
                ele.node.getComponent(PokerGamePlayer).foldNode.removeAllChildren()
                ele.node.getComponent(PokerGamePlayer).pokerNode.active = false;
            }
        })
    }

}