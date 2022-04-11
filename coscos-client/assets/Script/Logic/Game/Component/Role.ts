import {Player} from "../../Player/Player";

export class Role {
    self: boolean = false; // 是不是玩家自己

    uid: string = "";
    nick: string = "";
    money: number = 0;
    cover: string = "";
    seat: number = 0;

    node: cc.Node = null;

    static generateRoleByInfo(info) {
        const role = new Role();
        Object.assign(role, info);
        if (role.uid == Player.instance.uid) role.self = true;
        return role;
    }

    setNode(node: cc.Node) {
        this.node = node;
    }


}