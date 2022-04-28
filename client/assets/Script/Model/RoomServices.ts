import {ProtocolBase} from "../Base/ProtocolBase";
import {RoomPushRoute} from "../Constant/Route";
import {ControllerLogic} from "../Controller/Logic/ControllerLogic";
import {ListMap} from "../Base/Helper/ListMap";
import {AbstractGameOption} from "../Constant/Game";

export class RoomServices extends ProtocolBase {
    protected static _instance;
    protected roomEntity: RoomEntity;

    public static get instance() {
        this._instance = this._instance ?? new RoomServices();
        return this._instance;
    }

    // 获取房间
    public static get room() {
        return this.instance.roomEntity;
    }

    // 初始化监听
    protected initProtocols() {
        this.initProtocol(RoomPushRoute.OnRoomInfo, this.onRoomInfo.bind(this));
        this.initProtocol(RoomPushRoute.OnPlayerJoinRoom, this.onPlayerJoinRoom.bind(this));
        this.initProtocol(RoomPushRoute.OnPlayerLeaveRoom, this.onPlayerLeaveRoom.bind(this));
    }

    // 进入房间之后
    protected onRoomInfo(msg: any) {
        this.roomEntity = new RoomEntity(msg);
        ControllerLogic.getInstance().onLoginSuccess();
    }

    // 玩家加入房间
    protected onPlayerJoinRoom(message: any) {
        this.roomEntity.playerJoinRoom(message);
    }

    // 玩家离开房间
    protected onPlayerLeaveRoom(message: any) {
        this.roomEntity.playerLeaveRoom(message.uid);
    }


}

export class RoomEntity {
    roomId: number;
    password: number;
    master: string;
    gameOption: AbstractGameOption; // 游戏对应的设置
    players: ListMap<RoomPlayerEntity> = new ListMap<RoomPlayerEntity>("uid"); // 房间内的玩家

    constructor(roomInfo: any) {
        this.roomId = roomInfo.roomId;
        this.password = roomInfo.password;
        this.master = roomInfo.master;
        this.gameOption = roomInfo.gameOption;
        roomInfo.players.forEach(ele => {
            this.playerJoinRoom(ele);
        })
    }

    playerJoinRoom(playerInfo) {
        if (!this.players.has(playerInfo.uid)) {
            this.players.push(new RoomPlayerEntity(playerInfo));
        }
    }

    playerLeaveRoom(uid: string) {
        this.players.deleteKey(uid);
    }
}

export class RoomPlayerEntity {
    uid: string;

    constructor(info: any) {
        this.uid = info.uid;
    }
}