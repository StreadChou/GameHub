import {PokerManager} from "../../core/poker/PokerManager";
import {PokerSuit} from "../../../../constant/poker";
import {shuffleArray} from "../../../../helper/randomHelper";
import {Game} from "./game";
import {Player} from "./player";
import {GamePushRoute} from "../../../../constant/Route";
import {PokerCard} from "../../core/poker/pokerCard";
import {OnReceivedPokerMessage} from "../interface";


// 牌桌, 一切和牌相关的管理中心
export class Table extends PokerManager {
    game: Game;

    remainCardsMap: { [key in number]: PokerCard } = {}; // 剩余的牌
    removeCardsMap: { [key in number]: PokerCard } = {}; // 已经出去的牌

    nowCardsMap: { [key in number]: PokerCard } = null; // 现在的牌
    nowPlayer: Player = null; // 现在出牌的人


    get remainCards(): Array<PokerCard> {
        return Object.values(this.remainCardsMap);
    }

    get nowCards(): Array<PokerCard> {
        return Object.values(this.nowCardsMap);
    }

    get removeCards(): Array<PokerCard> {
        return Object.values(this.nowCardsMap);
    }


    constructor(game: Game, config: { [key in PokerSuit]?: Array<number> }) {
        super(config);
        this.game = game;
        this.cards = shuffleArray(this.cards);
        this.cards = shuffleArray(this.cards);

        this.cards.forEach(ele => {
            this.remainCardsMap[ele.value] = ele;
        })
    }

    static generateTable(game: Game): Table {
        const config = PokerManager.generateStandardCard();
        return new Table(game, config);
    }


    // 玩家出牌
    playerPlayerCards() {

    }

    // 出牌是否合法
    isCardsLegal() {

    }


    // 将客户端的信息转换成cards
    makeClientDataToCards(cards: any[]) {

    }


    // 给某人发牌
    sendCardToSomeBody(player: Player, number: number) {
        const remainCardsKey = Object.keys(this.remainCardsMap);
        const cardsKey = remainCardsKey.slice(0, number);
        const cards: Array<PokerCard> = []
        cardsKey.forEach(ele => {
            cards.push(this.remainCardsMap[ele]);
            this.remainCardsMap[ele] = undefined;
            delete this.remainCardsMap[ele];
        })
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
        this.game.pushDifferentiationMessage(GamePushRoute.OnReceivedPoker, player, message, otherMessage)
    }

    // 通知某人出牌
    noticeSomeBodyRound(player: Player) {
        const message = {
            nowCards: null, // 现在的牌面, 你必须大于此牌面, 如果为null, 则代表随意出牌
            user: player.uid,
        }
        this.game.pushMessage("", message);
    }


}