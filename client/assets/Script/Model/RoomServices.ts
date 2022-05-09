import {ProtocolBase} from "../Base/ProtocolBase";
import {Client2ServerCmd, GamePushRoute, RoomPushRoute} from "../Constant/Route";
import {ListMap} from "../Base/Helper/ListMap";
import {AbstractRoomOption} from "../Constant/Game";
import {fromJSON, Serialize} from "../Base/Helper/jsonHelper";
import {ControllerRoom} from "../Controller/Room/ControllerRoom";
import {RoomState} from "../Constant/Room";
import {UserServices} from "./UserServices";

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

        // 游戏操作
        this.initProtocol(Client2ServerCmd.GameOperate, this.responseGameOperation.bind(this));
        this.initProtocol(GamePushRoute.OnOperation, this.onPushGameOperation.bind(this));
    }

    // 请求创建房间
    requestCreateRoom = (message: any) => this.sendMsg(Client2ServerCmd.CreateRoom, message);

    // 创建房间成功之后, 直接加入房间
    onCreateRoomSuccess(message: any) {
        this.requestJoinRoom({roomId: message.data.roomId})
    }

    // 请求加入房间
    requestJoinRoom = (message: any) => this.sendMsg(Client2ServerCmd.JoinRoom, message);
    // 请求离开房间
    requestLeaveRoom = (message: any) => this.sendMsg(Client2ServerCmd.LeaveRoom, message);
    // 请求准备
    requestReady = (message: any) => this.sendMsg(Client2ServerCmd.Ready, message);
    // 请求开始游戏
    requestStartGame = (message: any) => this.sendMsg(Client2ServerCmd.StartGame, message);


    // 当收到房间信息
    protected onRoomInfo(message: any) {
        this.roomEntity = new RoomEntity(message);
        ControllerRoom.getInstance().onJoinRoomSuccess();
        ControllerRoom.getInstance().reloadPlayer();
    }

    // 玩家加入房间
    protected onPlayerJoinRoom(message: any) {
        this.roomEntity.playerJoinRoom(message);
        ControllerRoom.getInstance().reloadPlayer();
    }

    // 玩家离开房间
    protected onPlayerLeaveRoom(message: any) {
        if (message.uid == UserServices.user.uid) {
            ControllerRoom.getInstance().leaveRoom();
        } else {
            this.roomEntity.playerLeaveRoom(message.uid);
            ControllerRoom.getInstance().reloadPlayer();
        }
    }

    // 发送游戏事件
    requestGameOperation = (operation, data) => this.sendMsg(Client2ServerCmd.GameOperate, {operation, data});

    // 接收游戏事件
    responseGameOperation(_data) {
        if (_data.code == 200) {
            const {operation, data} = _data.data;
            ControllerRoom.getInstance().GameResponseOperation(operation, data);
        }
    }

    onPushGameOperation(data) {
        ControllerRoom.getInstance().GameOnPushOperation(data.operation, data.data);
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
    state: RoomState

    @Serialize()
    gameOption: AbstractRoomOption; // 游戏对应的设置

    players: ListMap<RoomPlayerEntity> = new ListMap<RoomPlayerEntity>("uid"); // 房间内的玩家

    constructor(roomInfo: any) {
        fromJSON(this, roomInfo)

        roomInfo.players.forEach(ele => {
            this.playerJoinRoom(ele);
        })

        console.error(this);
    }

    playerJoinRoom(playerInfo) {
        if (!this.players.has(playerInfo.uid)) {
            this.players.push(new RoomPlayerEntity(playerInfo));
        }
    }

    playerLeaveRoom(uid: string) {
        this.players.deleteKey(uid);
    }

    // 通过UID获取User
    getUserByUid(uid: string): RoomPlayerEntity {
        return this.players.key(uid);
    }

    // 通过Seat获取User
    getPlayerBySeat(seat: number): RoomPlayerEntity {
        return this.players.find(ele => ele.seat == seat);
    }

    isMaster(uid: string) {
        return this.master == uid;
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
    gold: number
    @Serialize()
    money: number
    @Serialize()
    cover: string
    @Serialize()
    seat: number;
    @Serialize()
    ready: boolean = false;

    constructor(userInfo: any) {
        fromJSON(this, userInfo)
    }
}