import {RoomPlayer} from "../component/roomPlayer";
import {ErrorCode} from "../../../constant/ErrorCode";
import {pinus, Channel} from "pinus";
import {RoomPushRoute} from "../../../constant/Route";
import {AbstractGame} from "../../game/core/abstract/abstractGame";
import {ClientException} from "../../../exception/clientException";
import {ListMap} from "../../../type/ListMap";
import {AbstractRoomOption} from "../../game/Interface";
import {FastDto, toDto} from "../../../helper/jsonHelper";
import {RoomState} from "../Interface";


enum DtoEnum {
    RoomInfo = 1,
}

export abstract class AbstractRoom {
    @FastDto({enumKey: [DtoEnum.RoomInfo]})
    roomId: number = 0;

    @FastDto({enumKey: [DtoEnum.RoomInfo]})
    password: number = 10;

    @FastDto({enumKey: [DtoEnum.RoomInfo]})
    master: string = "";

    @FastDto({enumKey: [DtoEnum.RoomInfo]})
    gameOption: AbstractRoomOption; // 游戏选项

    @FastDto({enumKey: [DtoEnum.RoomInfo]})
    state: RoomState = RoomState.None;

    players: ListMap<RoomPlayer> = new ListMap<RoomPlayer>("uid")

    channel: Channel; // 房间信道
    game: AbstractGame; // 游戏


    constructor(roomId: number, options: AbstractRoomOption) {
        this.roomId = roomId;
        this.setGameOptions(options)
        this.channel = pinus.app.get('channelService').getChannel(`room_${this.roomId}`, true);
    }

    get isRoomFull() {
        return this.players.length >= this.gameOption.maxPlayer;
    }

    getPlayer(uid: string) {
        let player: RoomPlayer = this.players.key(uid);
        if (!player) throw new ClientException(ErrorCode.NotInRoom, {}, "玩家不在房间中");
        return player;
    }


    // 加入房间
    public async joinRoom(player: RoomPlayer): Promise<void> {
        if (this.isRoomFull) throw new ClientException(ErrorCode.RoomFull, {}, "房间已满");
        if (this.players.has(player.uid)) throw new ClientException(ErrorCode.AlreadyInRoom, {}, "已经在房间中");
        // 加入房间
        if (this.players.length <= 0) this.master = player.uid;
        this.players.push(player);
        this.channel.add(player.uid, player.fid);
        player.seat = this.getSeat();
        await this.noticeJoinRoom(player);
    }


    public async leaveRoom(player: RoomPlayer): Promise<void> {
        if (this.players.has(player.uid)) throw new ClientException(ErrorCode.AlreadyInRoom, {}, "不在房间中");
        // TODO 切换房主
        await this.noticeLeveRoom(player);
    }

    public getSeat(): number {
        const seatList = this.players.map(ele => ele.seat)
        for (let i = 0; i < this.gameOption.maxPlayer; i++) {
            if (seatList.includes(i)) continue;
            return i;
        }
        return 0;
    }


    // 通知加入房间
    public async noticeJoinRoom(player: RoomPlayer) {
        // 先通知房间信息
        const roomInfoMessage: any = toDto(this, DtoEnum.RoomInfo);
        roomInfoMessage.players = this.players.map(ele => ele.makeClientData());
        player.pushMessage(RoomPushRoute.OnRoomInfo, roomInfoMessage);

        // 给房间所有人通知有人进入
        const joinRoomMessage: any = player.makeClientData()
        this.pushRoomMessage(RoomPushRoute.OnPlayerJoinRoom, joinRoomMessage).then();
    }


    // 通知玩家离开房间
    public async noticeLeveRoom(player: RoomPlayer) {
        const message: any = {
            uid: player.uid,
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

    protected abstract setGameOptions(options: AbstractRoomOption);

    public abstract startGame(): Promise<void>;
}
