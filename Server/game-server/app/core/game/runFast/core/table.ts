import {PokerManager} from "../../core/poker/PokerManager";
import {PokerSuit} from "../../../../constant/poker";
import {shuffleArray} from "../../../../helper/randomHelper";
import {Game} from "./game";
import {Player} from "./player";
import {GamePushRoute} from "../../../../constant/Route";
import {PokerCard} from "../../core/poker/pokerCard";
import {CardsType, OnReceivedPokerMessage} from "../interface";
import {CardTypeCheck, CardTypeIs} from "../../core/poker/helper/CardTypeFactory";
import {ErrorCode} from "../../../../constant/ErrorCode";
import {ClientException} from "../../../../exception/clientException";


// 牌桌, 一切和牌相关的管理中心
export class Table extends PokerManager {
    game: Game;

    remainCardsMap: { [key in number]: PokerCard } = {}; // 剩余的牌
    removeCardsMap: { [key in number]: PokerCard } = {}; // 已经出去的牌

    lastCardsMap: { [key in number]: PokerCard } = null; // 现在的牌
    lastPlayPlayer: Player = null; // 上一个出牌的人, 也就是上面的牌是谁打出来的

    nowPlayPlayer: Player = null; // 现在出牌的人
    timer: NodeJS.Timeout;


    get remainCards(): Array<PokerCard> {
        return Object.values(this.remainCardsMap);
    }


    get lastCards(): Array<PokerCard> {
        if (!this.lastCardsMap) return [];
        return Object.values(this.lastCardsMap);
    }

    get removeCards(): Array<PokerCard> {
        return Object.values(this.lastCardsMap);
    }


    constructor(game: Game, config: { [key in PokerSuit]?: Array<number> }) {
        super(config);

        this.game = game;

        this.cards.forEach(ele => {
            this.remainCardsMap[ele.value] = ele;
        })
    }

    static generateTable(game: Game): Table {
        // const config = PokerManager.generateStandardCard();
        const config: { [key in PokerSuit]?: Array<number> } = {}
        config[PokerSuit.ADVERT] = [];
        config[PokerSuit.JOKER] = [];
        config[PokerSuit.SPADE] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        config[PokerSuit.HEART] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        config[PokerSuit.DIAMOND] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        config[PokerSuit.CLUB] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        return new Table(game, config);
    }


    // 玩家出牌
    playerPlayCards(player: Player, cards: Array<PokerCard>) {
        let map: { [key in number]: PokerCard } = {};
        cards.forEach(ele => {
            map[ele.value] = ele;
            this.removeCardsMap[ele.value] = ele;
        })
        this.lastCardsMap = map;
        this.lastPlayPlayer = player;

        clearTimeout(this.timer);
        this.timer = undefined;

        const message = {
            uid: player.uid,
            cards: PokerManager.generateCardClientData(cards)
        }
        this.game.pushMessage(GamePushRoute.OnPlayerPlay, message);
        cards.forEach(ele => {
            delete player.remainCardsMap[ele.value];
        })
        if (player.cardNumber <= 0) {
            clearTimeout(this.timer);
            this.timer = undefined;
            this.game.standRule.next();
        } else {
            this.enterPlayerRound(this.calcNextPlayer(player))
        }
    }

    // 玩家跳过
    playerPass(player: Player) {
        clearTimeout(this.timer);
        this.timer = undefined;

        const message = {
            uid: player.uid,
            cards: [],
        }
        this.game.pushMessage(GamePushRoute.OnPlayerPlay, message);

        this.enterPlayerRound(this.calcNextPlayer(player))
    }

    calcNextPlayer(player: Player): Player {
        let seat: Array<number> = this.game.playerList.map(ele => {
            return ele.seat;
        }).sort((eleA, eleB) => eleA - eleB);
        if (seat[seat.length - 1] == player.seat) {
            return this.game.playerList.filter(ele => ele.seat == seat[0])[0]
        }
        return this.game.playerList.filter(ele => ele.seat == seat[seat.indexOf(player.seat) + 1])[0]
    }

    // 出牌是否合法
    isCardsLegal(player: Player, cards: Array<PokerCard>) {
        if (player.uid != this.nowPlayPlayer.uid) throw new ClientException(ErrorCode.COMMON_ERROR, {}, "当前不是您的出牌阶段")

        if (!this.checkCardsLegal(cards)) throw new ClientException(ErrorCode.COMMON_ERROR, {}, "牌型不合法")

        if (!this.lastCardsMap) return true;

        return this.checkCardsGtLast(cards);
    }

    // 检查牌本身是否合法
    checkCardsLegal(cards: Array<PokerCard>) {
        const type = this.checkCardsType(cards);
        return type !== null;
    }


    checkCardsGtLast(cards: Array<PokerCard>): boolean {
        const lastCards = Object.values(this.lastCardsMap);
        const lastType = this.checkCardsType(Object.values(this.lastCardsMap));
        const myType = this.checkCardsType(cards);
        if (lastType != myType && myType == CardsType.FourOfAKind) {
            throw new ClientException(ErrorCode.COMMON_ERROR, {}, "牌型不合法")
        }

        if (lastType == myType) {
            const config = this.game.config.pokerConfig.CardsTypeConfig[lastType] ?? {};
            config.pokerRankSort = this.game.config.pokerConfig.pokerRankSort;
            return CardTypeCheck(lastType, cards, lastCards, config)
        }
        if (myType == CardsType.FourOfAKind) {
            return true;
        }
        throw new ClientException(ErrorCode.COMMON_ERROR, {}, "您的牌小于上家出牌")
    }

    checkCardsType(cards: Array<PokerCard>): CardsType {
        for (let item of this.game.config.pokerConfig.cardsType) {
            const config = this.game.config.pokerConfig.CardsTypeConfig[item] ?? {};
            config.pokerRankSort = this.game.config.pokerConfig.pokerRankSort;
            if (CardTypeIs(item, cards, config)) return item;
        }
        return null;
    }


    enterPlayerRound(player: Player) {
        // 如果一个回合下来, 没人要牌. 则直接跳过
        if (this.lastPlayPlayer && this.lastPlayPlayer.uid == player.uid) {
            this.lastCardsMap = null;
            this.lastPlayPlayer = null;
        }

        this.nowPlayPlayer = player;
        this.noticeSomeBodyRound();

        this.timer = setTimeout(() => {
            if (this.lastCardsMap) {
                this.game.roundPass(player.uid);
            } else {
                this.game.roundPlay(player.uid, [], true)
            }
        }, this.game.config.roundTime * 1000);
    }


    // 给某人发牌
    sendCardToSomeBody(player: Player, number: number) {
        let remainCardsKey = Object.keys(this.remainCardsMap);
        remainCardsKey = shuffleArray(remainCardsKey);
        remainCardsKey = shuffleArray(remainCardsKey);

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
    noticeSomeBodyRound() {
        const message = {
            lastCards: PokerManager.generateCardClientData(this.lastCards), // 现在的牌面, 你必须大于此牌面, 如果为null, 则代表随意出牌
            uid: this.nowPlayPlayer.uid,
            time: this.game.config.roundTime,
        }
        this.game.pushMessage(GamePushRoute.OnPlayerRound, message);
    }


}