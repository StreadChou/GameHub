import {ProtocolBase} from "../Base/ProtocolBase";
import {Client2ServerCmd, RoomPushRoute} from "../Constant/Route";
import {ListMap} from "../Base/Helper/ListMap";
import {AbstractRoomOption} from "../Constant/Game";
import {fromJSON, Serialize} from "../Base/Helper/jsonHelper";
import {ControllerRoom} from "../Controller/Room/ControllerRoom";

export class RoomServices extends ProtocolBase {
    protected static _instance;
    protected roomEntity: RoomEntity;

    public static get instance(): RoomServices {
        if (!this._instance) {
            this._instance = new RoomServices();
            this._instance.addProtocols();
        }
        return this._instance;
    }

    // 获取房间
    public static get room() {
        return this.instance.roomEntity;
    }

    // 初始化监听
    protected initProtocols() {
        this.initProtocol(Client2ServerCmd.CreateRoom, this.onCreateRoomSuccess.bind(this));

        this.initProtocol(RoomPushRoute.OnRoomInfo, this.onRoomInfo.bind(this));
        this.initProtocol(RoomPushRoute.OnPlayerJoinRoom, this.onPlayerJoinRoom.bind(this));

        this.initProtocol(RoomPushRoute.OnPlayerLeaveRoom, this.onPlayerLeaveRoom.bind(this));
    }

    // 创建房间
    requestCreateRoom(message: any) {
        this.sendMsg(Client2ServerCmd.CreateRoom, message);
    }

    // 创建房间
    requestJoinRoom(message: any) {
        this.sendMsg(Client2ServerCmd.JoinRoom, message);
    }

    // 创建房间成功之后
    onCreateRoomSuccess(message: any) {
        this.requestJoinRoom({roomId: message.data.roomId}) // 请求加入房间
    }

    // 进入房间之后
    protected onRoomInfo(message: any) {
        console.error("onRoomInfo", message)
        this.roomEntity = new RoomEntity(message);
        ControllerRoom.getInstance().onJoinRoomSuccess();
    }

    // 玩家加入房间
    protected onPlayerJoinRoom(message: any) {
        console.error("onPlayerJoinRoom", message)
        this.roomEntity.playerJoinRoom(message);
    }

    // 玩家离开房间
    protected onPlayerLeaveRoom(message: any) {
        this.roomEntity.playerLeaveRoom(message.uid);
    }
}

export class RoomEntity {
    @Serialize()
    roomId: number;

    @Serialize()
    password: number;

    @Serialize()
    master: string;

    @Serialize()
    gameOption: AbstractRoomOption; // 游戏对应的设置

    players: ListMap<RoomPlayerEntity> = new ListMap<RoomPlayerEntity>("uid"); // 房间内的玩家

    constructor(roomInfo: any) {
        fromJSON(this, roomInfo)

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
    @Serialize({type: "string"})
    uid: string;

    @Serialize()
    nick: string

    @Serialize()
    level: number

    @Serialize()
    money: number

    @Serialize()
    cover: string

    constructor(userInfo: any) {
        fromJSON(this, userInfo)
    }
}