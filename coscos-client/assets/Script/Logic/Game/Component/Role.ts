import {Player} from "../../Player/Player";
import PokerGamePlayer from "../../../Prefab/Game/PokerGamePlayer";
import PokerGameSelf from "../../../Prefab/Game/PokerGameSelf";

export class Role {
    self: boolean = false; // 是不是玩家自己

    uid: string = "";
    nick: string = "";
    money: number = 0;
    cover: string = "";
    seat: number = 0;

    node: cc.Node = null;
    roundTimer = null;

    static generateRoleByInfo(info) {
        const role = new Role();
        Object.assign(role, info);
        if (role.uid == Player.instance.uid) role.self = true;
        return role;
    }

    setNode(node: cc.Node) {
        this.node = node;
    }

    // 某个玩家开始出牌
    OnPlayerRound(message) {
        let {time, uid} = message;

        let {timerNode, timeLabel} = this.getRoundTimer();

        // 是别人的回合
        if (this.uid != uid) {
            this.UIDisableUserRoundTime(timerNode, timeLabel);
            return undefined;
        } else {
            timerNode.active = true;
        }

        // 不管是谁出牌. 都需要设置一个定时器,
        this.UIStartUserRoundTime(time, timerNode, timeLabel);
    }

    // 清理我手上的牌
    clearFoldCardsNode() {
        let node: cc.Node;
        if (this.self) {
            // 如果是我的视角
            const roleComp = this.node.getComponent(PokerGameSelf);
            // 设置定时器
            node = roleComp.foldNode;
        } else {
            const roleComp = this.node.getComponent(PokerGamePlayer);
            node = roleComp.foldNode;
        }
        node.removeAllChildren();
    }

    // 开始用户回合定时器
    UIStartUserRoundTime(time: number, timerNode?: cc.Node, timeLabel?: cc.Label) {
        if (!timerNode || !timeLabel) {
            const res = this.getRoundTimer();
            timerNode = res.timerNode;
            timeLabel = res.timeLabel;
        }

        timeLabel.string = time.toString();
        this.roundTimer = setInterval(() => {
            time--;
            timeLabel.string = time.toString();
        }, 1000)
    }

    // 结束用户回合定时器
    UIDisableUserRoundTime(timerNode?: cc.Node, timeLabel?: cc.Label) {
        if (!timerNode || !timeLabel) {
            const res = this.getRoundTimer();
            timerNode = res.timerNode;
            timeLabel = res.timeLabel;
        }

        timerNode.active = false;
        clearInterval(this.roundTimer);
        this.roundTimer = null;
    }


    // 获取计时器相关的两个节点
    getRoundTimer(): { timerNode: cc.Node, timeLabel: cc.Label } {
        let timerNode: cc.Node;
        let timeLabel: cc.Label;

        if (this.self) {
            const roleComp = this.node.getComponent(PokerGameSelf);
            timerNode = roleComp.timer;
            timeLabel = roleComp.time;
        } else {
            const roleComp = this.node.getComponent(PokerGamePlayer);
            timerNode = roleComp.timer;
            timeLabel = roleComp.time;
        }
        return {timerNode, timeLabel};
    }


}