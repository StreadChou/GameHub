import Game from "./Game";
import {PokerCard} from "../../core/poker/PokerCard";

export class Table {
    game: Game
    initPokers: Array<PokerCard> = [] // 初始的牌
    remainPokers: Array<PokerCard> = [] // 剩余的牌
    foldPokers: Array<PokerCard> = [] // 已经丢弃的牌


    constructor(game: Game) {
        this.game = game;
    }

    // 给玩家发牌
    sendPokerToPlayer() {

    }
}