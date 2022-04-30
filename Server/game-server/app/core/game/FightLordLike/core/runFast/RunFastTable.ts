import RunFastGame from "./RunFastGame";
import {PokerCard} from "../../../core/poker/PokerCard";
import {PokerManager} from "../../../core/poker/PokerManager";
import {PokerSuit} from "../../../core/poker/Interface";
import {shuffleArray} from "../../../../../helper/randomHelper";
import {RunFastRole} from "./RunFastRole";
import {GamePushRoute} from "../../../../../constant/Route";
import {AbstractFightLordLikeTable} from "../AbstractFightLordLikeTable";

export class RunFastTable extends AbstractFightLordLikeTable {
    game: RunFastGame
    pokerManager: PokerManager;

    initPokers: Array<PokerCard> = [] // 初始的牌
    remainPokers: Array<PokerCard> = [] // 剩余的牌
    foldPokers: Array<PokerCard> = [] // 已经丢弃的牌


    constructor(game: RunFastGame) {
        super(game);
        this.game = game;
        this.pokerManager = new PokerManager(PokerManager.getPokerConfig(1));
        if (this.game.gameConfig.pokerNumber == 16) {
            this.use16Cards();
        } else {
            this.use15Cards();
        }
        this.initPokers = [].concat(this.initPokers, this.pokerManager.cards);
        this.remainPokers = shuffleArray(this.initPokers);
    }

    use16Cards() {
        this.pokerManager.excludeCardsRank(null, PokerSuit.JOKER, 2);
        this.pokerManager.excludeCardsRank(2, null, 3); // 去掉三个2
        this.pokerManager.excludeCardsRank(1, null, 1); // 去掉一个A
    }

    use15Cards() {
        this.pokerManager.excludeCardsRank(null, PokerSuit.JOKER, 2);
        this.pokerManager.excludeCardsRank(2, null, 3); // 去掉三个2
        this.pokerManager.excludeCardsRank(1, null, 3); // 去掉一个A
        this.pokerManager.excludeCardsRank(13, null, 1); // 去掉一个K
    }


    // 给玩家发牌
    sendPokerToPlayer(role: RunFastRole, number = this.game.gameConfig.pokerNumber) {
        const pokers = this.remainPokers.splice(0, number);
        role.receivePokers(pokers);
        const pokerInfo = PokerManager.makeClient(pokers);

        const message = {
            uid: role.uid,
            number: pokerInfo.length,
            cards: pokerInfo,
        }
        const otherMessage = {
            uid: role.uid,
            number: pokerInfo.length,
        }
        this.game.pushDifferentiationMessage(GamePushRoute.OnReceivedPoker, role, message, otherMessage)
    }

    // 玩家出牌
    playerPlayPokers(pokers: Array<PokerCard>) {
        this.foldPokers = this.foldPokers.concat(pokers);
    }


    // 从卡牌中获取一副好牌, 作为测试
    getTestCardsFromRemain() {
        // 百分之10 的概率获取一个炸弹

        // 百分之30 的概率获取三张

        // 百分之20 的概率获取一个链子

        // 百分之80 的概率获取一个连对
    }
}