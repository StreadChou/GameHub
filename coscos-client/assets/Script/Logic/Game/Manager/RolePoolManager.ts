const {ccclass, property} = cc._decorator;

@ccclass
export default class RolePoolManager extends cc.Component {
    static instance: RolePoolManager = null;

    @property({type: cc.Prefab, displayName: "房间内的玩家"})
    RoomPlayer: cc.Prefab = null;

    @property({type: cc.Prefab, displayName: "房间内我的视角"})
    RoomSelf: cc.Prefab = null;

    @property({type: cc.Prefab, displayName: "扑克牌"})
    poker: cc.Prefab = null;

    @property({type: cc.SpriteAtlas, displayName: "扑克图集"})
    pokerAtlas: cc.SpriteAtlas = null;


    onLoad() {
        RolePoolManager.instance = this;
        cc.game.addPersistRootNode(this.node);
    }

    getRoomPlayerNode() {
        return cc.instantiate(this.RoomPlayer);
    }

    getRoomSelfNode() {
        return cc.instantiate(this.RoomSelf);
    }


    getPokerNode() {
        return cc.instantiate(this.poker);
    }

    getPokerSpriteFrame(suit: number, rank: number): cc.SpriteFrame {
        const name = `card_${suit}_${rank}`;
        return this.pokerAtlas.getSpriteFrame(name);
    }

}
