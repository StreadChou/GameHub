import {AbstractGame} from "../../abstract/abstractGame";
import {AbstractRoom} from "../../../room/room/abstractRoom";
import {RoomPlayer} from "../../../room/component/roomPlayer";
import {Player} from "./player";
import {Table} from "./table";
import {GamePushRoute} from "../../../../constant/Route";
import {OnReceivedPokerMessage} from "../dto/gameDto";
import {PokerManager} from "../../core/poker/PokerManager";

interface LookDespairCreateDto {

}


// 干瞪眼游戏
export class Game extends AbstractGame {
    // 玩家
    playerMap: { [uid in string]: Player } = {}

    // 当前回合
    nowRound: string = "";

    table: Table;

    get playerList(): Array<Player> {
        return Object.values(this.playerMap)
    }

    constructor(room: AbstractRoom, roomPlayers: Array<RoomPlayer>, opts: LookDespairCreateDto, callback: Function) {
        super(room, roomPlayers, callback);
        this.initPlayer(roomPlayers);
        this.table = Table.generateTable();

        this.startGame();
    }

    protected initPlayer(roomPlayers: Array<RoomPlayer>) {
        roomPlayers.forEach(roomPlayer => {
            const player = Player.generate(roomPlayer);
            this.playerMap[player.uid] = player;
        })
    }

    public startGame() {
        this.playerList.forEach(ele => {
            this.sendCardToSomeBody(ele, 5);
        })
    }


    // 给某人发牌
    sendCardToSomeBody(player: Player, number: number) {
        const cards = this.table.cards.slice(0, number);
        player.addCards(cards);
        const cardInfo = PokerManager.generateCardClientData(cards);

        const message: OnReceivedPokerMessage = {
            uid: player.uid,
            number: cardInfo.length,
            cards: cardInfo,
        }
        const otherMessage: OnReceivedPokerMessage = {
            uid: player.uid,
            number: cardInfo.length,
        }
        this.pushDifferentiationMessage(GamePushRoute.OnReceivedPoker, player, message, otherMessage)
    }

    public endGame() {
        this.callback(this);
    }
}