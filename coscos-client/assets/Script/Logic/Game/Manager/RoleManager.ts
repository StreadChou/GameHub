import {Role} from "../Component/Role";
import RolePoolManager from "./RolePoolManager";
import RoomPlayer from "../../../Prefab/Game/RoomPlayer";
import UIGamePoker from "../../../UIScript/Screen/UIGamePoker";
import {Player} from "../../Player/Player";

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
            const roleNode = RolePoolManager.instance.getRoomPlayerNodeFromPool();
            ele.setNode(roleNode);
            UIGamePoker.inst.addRole(roleNode);
        })

    }


}