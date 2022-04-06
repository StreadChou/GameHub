import {PokerManager} from "../../core/poker/PokerManager";
import {PokerSuit} from "../../../../constant/poker";
import {shuffleArray} from "../../../../helper/randomHelper";
import {Game} from "./game";
import {Player} from "./player";
import {GamePushRoute} from "../../../../constant/Route";
import {PokerCard} from "../../core/poker/pokerCard";
import {OnReceivedPokerMessage} from "../interface";

export class Table extends PokerManager {
    game: Game;
    cards: PokerCard[] = [];

    constructor(config: { [key in PokerSuit]?: Array<number> }) {
        super(config);
    }

    get remainCardNumber(): number {
        return this.cards.length;
    }


    static generateTable(game: Game): Table {
        const config = PokerManager.generateStandardCard();
        const table = new Table(config);
        table.cards = shuffleArray(table.cards);
        table.game = game;
        return table;
    }


    // 给某人发牌
    sendCardToSomeBody(player: Player, number: number) {
        const cards = this.cards.slice(0, number);
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


}