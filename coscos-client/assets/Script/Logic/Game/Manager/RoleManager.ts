import {Role} from "../Component/Role";
import RolePoolManager from "./RolePoolManager";
import UIGamePoker from "../../../UIScript/Screen/UIGamePoker";
import PokerGamePlayer from "../../../Prefab/Game/PokerGamePlayer";
import PokerGame from "../PokerGame";
import {Player} from "../../Player/Player";

export class RoleManager {
    roleUidMap: Map<string, Role> = new Map()
    self: Role;  // 我自己. 也被包含在 roleSeatMap 中
    load: boolean = false;
    rolePoolManager: RolePoolManager;


    constructor() {
        this.rolePoolManager = RolePoolManager.instance;
    }

    onLoadingFinish() {
        this.load = true;
        this.resetSeat();
    }

    getRole(uid) {
        return this.roleUidMap.get(uid);
    }

    addRole(roleInfo) {
        if (this.roleUidMap.has(roleInfo.uid)) return;

        const role = Role.generateRoleByInfo(roleInfo);
        this.roleUidMap.set(roleInfo.uid, role)
        if (Player.instance.uid == role.uid) this.self = role;

        if (this.load) {
            this.resetSeat();
        }
    }


    deleteRole(info: any) {

    }

    resetSeat() {
        this.roleUidMap.forEach((ele, uid) => {
            if (this.self.uid == ele.uid) {
                const roleNode = RolePoolManager.instance.getRoomSelfNode();
                roleNode.setPosition(roleNode.x, roleNode.y - 230);
                ele.setNode(roleNode);
                UIGamePoker.inst.addRole(roleNode);
            } else {
                const roleNode = RolePoolManager.instance.getRoomPlayerNode();
                ele.setNode(roleNode);
                const comp = roleNode.getComponent(PokerGamePlayer);
                comp.setPlayer(ele);
                this.renderRole(ele, roleNode, comp);
            }
        })
    }

    renderRole(target: Role, roleNode: cc.Node, comp: PokerGamePlayer) {
        console.log("test");
        const maxPlayer = PokerGame.instance.roomController.maxPlayer;
        if (maxPlayer == 2) {
            comp.useTopLayOut();
            UIGamePoker.inst.addRole(roleNode, "top");
        }
        const selfSeat = this.self.seat;
        let targetOffset = target.seat - selfSeat;
        if (targetOffset < 0) targetOffset = maxPlayer + targetOffset;

        if (maxPlayer == 3) {
            if (targetOffset == 1) {
                comp.useRightLayout();
                UIGamePoker.inst.addRole(roleNode, "right-top");
            }
            if (targetOffset == 2) {
                comp.useLeftLayout();
                UIGamePoker.inst.addRole(roleNode, "left-top");
            }
        }

        if (maxPlayer == 4) {
            if (targetOffset == 1) {
                comp.useRightLayout();
                UIGamePoker.inst.addRole(roleNode, "right-top");
            }
            if (targetOffset == 2) {
                comp.useTopLayOut();
                UIGamePoker.inst.addRole(roleNode, "top");
            }
            if (targetOffset == 3) {
                comp.useLeftLayout();
                UIGamePoker.inst.addRole(roleNode, "left-top");
            }
        }

        if (maxPlayer == 5) {
            if (targetOffset == 1) {
                comp.useRightLayout();
                UIGamePoker.inst.addRole(roleNode, "right");
            }
            if (targetOffset == 2) {
                comp.useRightLayout();
                UIGamePoker.inst.addRole(roleNode, "right-top");
            }
            if (targetOffset == 3) {
                comp.useLeftLayout();
                UIGamePoker.inst.addRole(roleNode, "left-top");
            }
            if (targetOffset == 4) {
                comp.useLeftLayout();
                UIGamePoker.inst.addRole(roleNode, "left");
            }
        }

        if (maxPlayer == 6) {
            if (targetOffset == 1) {
                comp.useRightLayout();
                UIGamePoker.inst.addRole(roleNode, "right");
            }
            if (targetOffset == 2) {
                comp.useRightLayout();
                UIGamePoker.inst.addRole(roleNode, "right-top");
            }
            if (targetOffset == 3) {
                comp.useTopLayOut();
                UIGamePoker.inst.addRole(roleNode, "top");
            }
            if (targetOffset == 4) {
                comp.useLeftLayout();
                UIGamePoker.inst.addRole(roleNode, "left");
            }
            if (targetOffset == 5) {
                comp.useLeftLayout();
                UIGamePoker.inst.addRole(roleNode, "left");
            }
        }


    }


}