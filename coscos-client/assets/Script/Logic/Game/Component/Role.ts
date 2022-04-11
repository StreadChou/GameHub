import RoomPlayer from "../../../Prefab/Game/RoomPlayer";

export class Role {
    uid: string = "";
    nick: string = "";
    money: number = 0;
    cover: string = "";
    seat: number = 0;

    node: cc.Node = null;

    static generateRoleByInfo(info) {
        const role = new Role();
        Object.assign(role, info);
        return role;
    }

    setNode(node: cc.Node) {
        this.node = node;
        const roomPlayer = node.getComponent(RoomPlayer);
        roomPlayer.setPlayer(this);
    }


}