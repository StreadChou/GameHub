const {ccclass, property} = cc._decorator;

@ccclass
export default class RolePoolManager extends cc.Component {
    static instance: RolePoolManager = null;

    @property({type: cc.Prefab, displayName: "房间内的玩家"})
    RoomPlayer: cc.Prefab = null;

    @property({type: cc.Prefab, displayName: "扑克牌"})
    poker: cc.Prefab = null;

    @property({type: cc.SpriteAtlas, displayName: "扑克图集"})
    pokerAtlas: cc.SpriteAtlas = null;


    private RoomPlayerNodePool: cc.NodePool;

    onLoad() {
        RolePoolManager.instance = this;
        cc.game.addPersistRootNode(this.node);
        this.RoomPlayerNodePool = new cc.NodePool();
    }

    getRoomPlayerNodeFromPool() {
        if (this.RoomPlayerNodePool.size() > 0) {
            return this.RoomPlayerNodePool.get();
        } else {
            return cc.instantiate(this.RoomPlayer);
        }
    }

}
