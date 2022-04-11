import {Role} from "../Component/Role";
import RolePoolManager from "./RolePoolManager";
import UIGamePoker from "../../../UIScript/Screen/UIGamePoker";
import {Player} from "../../Player/Player";
import PokerGamePlayer from "../../../Prefab/Game/PokerGamePlayer";
import PokerGameSelf from "../../../Prefab/Game/PokerGameSelf";

export class RoleManager {
    roleUidMap: Map<number, Role> = new Map()
    self: Role;  // 我自己. 也被包含在 roleSeatMap 中

    rolePoolManager: RolePoolManager;

    constructor() {
        this.rolePoolManager = RolePoolManager.instance;
    }

    onLoadingFinish() {
        this.resetSeat();
    }

    addRole(roleInfo) {
        if (this.roleUidMap.has(roleInfo.uid)) return;
        const role = Role.generateRoleByInfo(roleInfo);
        if (role.uid == Player.instance.uid) {
            this.self = role;
        }
        this.roleUidMap.set(roleInfo.uid, role)
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
                UIGamePoker.inst.addRole(roleNode);
            }
        })
    }


}