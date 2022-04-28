import {RoomPlayer} from "../component/roomPlayer";
import {ErrorCode} from "../../../../object/ErrorCode";
import {pinus, Channel} from "pinus";
import {RoomPushRoute} from "../../../constant/Route";
import {AbstractGame} from "../../game/core/abstract/abstractGame";
import {ClientException} from "../../../exception/clientException";
import {ListMap} from "../../../type/ListMap";
import {GameOptions} from "../../game/Interface";
import {
    OnPlayerJoinRoomMessage,
    OnPlayerLeaveRoomMessage,
    OnRoomInfoMessage
} from "../../../constant/clientDto/Server2ClientDto";

export abstract class AbstractRoom {

    roomId: number = 0;
    password: number = 10;
    master: string = "";
    players: ListMap<RoomPlayer> = new ListMap<RoomPlayer>("uid")
    gameOption: GameOptions; // 游戏选项

    channel: Channel; // 房间信道
    game: AbstractGame; // 游戏


    protected constructor(roomId: number, gameOptions: GameOptions) {
        this.roomId = roomId;
        this.setGameOptions(gameOptions)
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
        for (let i = 1; i <= this.gameOption.maxPlayer; i++) {
            if (seatList.includes(i)) continue;
            return i;
        }
        return 0;
    }


    // 通知加入房间
    public async noticeJoinRoom(player: RoomPlayer) {
        // 先通知房间信息
        const roomInfoMessage: OnRoomInfoMessage = {
            roomId: this.roomId,
            master: this.master,
            password: this.password,
            maxPlayer: this.gameOption.maxPlayer,
            playerList: this.players.map(ele => ele.makeClientData()),
        }
        player.pushMessage(RoomPushRoute.OnRoomInfo, roomInfoMessage);

        // 给房间所有人通知有人进入
        const joinRoomMessage: OnPlayerJoinRoomMessage = player.makeClientData()
        this.pushRoomMessage(RoomPushRoute.OnPlayerJoinRoom, joinRoomMessage).then();
    }


    // 通知玩家离开房间
    public async noticeLeveRoom(player: RoomPlayer) {
        const message: OnPlayerLeaveRoomMessage = {
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

    protected abstract setGameOptions(gameOptions: GameOptions);

    public abstract startGame(): Promise<void>;
}
