import {RoomPlayer} from "../component/roomPlayer";
import {CreateRoomDto, PlayerJoinRoomDto} from "../dto/RoomDto";
import {RequestParamsException} from "../../../exception/RequestParamsException";
import {ErrorCode} from "../../../constant/ErrorCode";
import {pinus, Channel} from "pinus";
import {RoomPushRoute} from "../../../constant/Route";
import {JOIN_ROOM_REASON, LEAVE_ROOM_REASON} from "../../../constant/Room";
import {AbstractGame} from "../../game/abstract/abstractGame";

export abstract class AbstractRoom {
    roomId: number = 0;
    roomParams: CreateRoomDto;
    playerMap: { [key in string]: RoomPlayer } = {}
    password: number = 10;
    master: string = "";
    // 房间信道
    channel: Channel;
    // 游戏
    game: AbstractGame

    get roomMaxPlayerNumber(): number {
        return 3
    };

    get playerNumber(): number {
        return Object.keys(this.playerMap).length
    }

    get playerList(): Array<RoomPlayer> {
        return Object.values(this.playerMap);
    }

    get isRoomFull(): boolean {
        return this.playerNumber >= this.roomMaxPlayerNumber;
    };


    protected constructor(roomId: number, params: CreateRoomDto) {
        this.roomId = roomId;
        this.roomParams = params;
        this.channel = pinus.app.get('channelService').getChannel(`room_${this.roomId}`, true);
        console.log(this.channel);
    }

    // 从房间中获取玩家
    public async getPlayerFromRoom(uid: string): Promise<RoomPlayer> {
        let player: RoomPlayer = this.playerMap[uid];
        if (!player) throw new RequestParamsException(ErrorCode.NOT_IN_ROOM);
        return player;
    }


    // 检查是否可以加入房间
    public async checkPlayerCanJoinRoom(player: RoomPlayer, opts: PlayerJoinRoomDto): Promise<void> {
        if (this.isRoomFull) throw new RequestParamsException(ErrorCode.ROOM_IS_FULL, "检查是否可以加入房间, 但是房间已满");
        if (this.playerMap.hasOwnProperty(player.uid)) throw new RequestParamsException(ErrorCode.ALREADY_IN_ROOM, "已经在房间中");
        if (this.password && this.password != opts.password) throw new RequestParamsException(ErrorCode.PASSWORD_ERROR, "房间密码错误");
    }

    // 加入房间
    public async joinRoom(player: RoomPlayer): Promise<void> {
        if (this.playerNumber <= 0) this.setMaster(player);
        this.playerMap[player.uid] = player;
        this.channel.add(player.uid, player.fid);
        player.seat = this.getSeat();
        await this.noticeJoinRoom(player);
    }

    // 设置房主
    public setMaster(player: RoomPlayer) {
        player.master = true;
        this.master = player.uid;
    }

    public async leaveRoom(player: RoomPlayer): Promise<void> {
        delete this.playerMap[player.uid];
        await this.noticeLeveRoom(player);
    }

    public getSeat(): number {
        const seatList = this.playerList.map(ele => {
            return ele.seat;
        })
        for (let i = 1; i <= this.roomMaxPlayerNumber; i++) {
            if (seatList.includes(i)) continue;
            return i;
        }
        return 0;
    }


    // 通知加入房间
    public async noticeJoinRoom(player: RoomPlayer) {
        // 先通知房间信息
        const roomInfoMessage: NoticeRoomInfo = {
            roomId: this.roomId,
            master: this.master,
            password: this.password,
            playerList: this.makeClientPlayerList(),

        }
        player.pushMessage(RoomPushRoute.OnRoomInfo, roomInfoMessage);

        // 给房间所有人通知有人进入
        const joinRoomMessage: playerClientData = player.makeClientData()
        this.pushRoomMessage(RoomPushRoute.OnPlayerJoinRoom, joinRoomMessage).then();
    }

    // 生成玩家列表给客户端
    public makeClientPlayerList(): Array<playerClientData> {
        const rlt: Array<playerClientData> = []
        this.playerList.forEach(ele => {
            rlt.push(ele.makeClientData())
        })
        return rlt;
    }

    // 通知玩家离开房间
    public async noticeLeveRoom(player: RoomPlayer) {
        const message: NoticeLeaveRoomDto = {
            uid: player.uid,
            reason: LEAVE_ROOM_REASON.DEFAULT
        }
        this.pushRoomMessage(RoomPushRoute.OnPlayerLeaveRoom, message).then();
    }

    // 给房间发送消息
    public async pushRoomMessage(route: string, message: any) {
        return new Promise((resolve, reject) => {
            this.channel.pushMessage(route, message, {}, (error, res) => {
                if (error) return reject(error);
                return resolve(res);
            });
        })

    }


    public abstract startGame(): Promise<void>;

}
