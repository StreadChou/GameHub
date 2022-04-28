import RunFastGame from "./RunFastGame";
import {RunFastRole} from "./RunFastRole";
import {ClientException} from "../../../../../exception/clientException";
import {ErrorCode} from "../../../../../constant/ErrorCode";
import {PokerCard} from "../../../core/poker/PokerCard";
import {CardsType} from "../../Interface";
import {CardTypeCheck, CardTypeIs} from "../../poker/helper/CardTypeFactory";
import {AbstractFightLordLikeReferee} from "../AbstractFightLordLikeReferee";

// 管理未发的牌以及已经出的牌
export class RunFastReferee extends AbstractFightLordLikeReferee {
    game: RunFastGame

    // 当前是谁的回合, locker 查看 setRoundLocker
    round: { role: RunFastRole, locker: boolean, timer: NodeJS.Timeout };

    // 上一个回合(目前桌面上) 是谁出的牌, 出的啥, 以及牌的类型
    last: { role: RunFastRole, pokers: Array<PokerCard>, type: CardsType };

    constructor(game: RunFastGame) {
        super(game);
        this.game = game;
    }


    // 出牌有两种方式, 玩家手动出牌和倒计时到了之后系统出牌
    // 这两个可能同时触发, 所以增加一个锁
    setRoundLocker(role: RunFastRole): boolean {
        if (this.round.role != role) throw new ClientException(ErrorCode.NotRoleRound, {}, "当前不是您的回合");
        return this.round.locker;
    }

    // 裁判收到玩家出牌
    playerPlayPoker(role: RunFastRole, pokers: Array<PokerCard>) {
        // 如果之前就是我出的牌, 现在又轮到我出牌了, 也就是过了一个回合都没人要, 就把last 清空了
        if (this.last && this.last.role == role) this.last = undefined;

        // 我所出的牌的类型
        let type: CardsType;

        // 如果之前没有人出牌. 那我就自由出牌, 否则压制出牌
        if (!this.last) {
            type = this.playerFreePlay(role, pokers);
        } else {
            type = this.playerSuppressPlay(role, pokers);
        }

        // 记录上家出牌, 让下家
        this.last = {role, pokers, type};

    }

    // 玩家自由出牌
    playerFreePlay(role: RunFastRole, pokers: Array<PokerCard>): CardsType {
        // 判断牌型是否合法
        for (let allowCardsType of this.game.gameOption.allowCardsType) {
            if (CardTypeIs(allowCardsType, pokers, this.game.cardsTypeConfig, this.game.gameOption)) {
                return allowCardsType;
            }
        }
        throw new ClientException(ErrorCode.PokerIllegal, {}, "出牌不合法");
    }

    // 玩家压制出牌
    playerSuppressPlay(role: RunFastRole, pokers: Array<PokerCard>): CardsType {
        // 判断我和之前的是不是同一个牌型, 如果是的话
        if (CardTypeIs(this.last.type, pokers, this.game.cardsTypeConfig, this.game.gameOption)) {
            // 判断我是否比上家大
            if (CardTypeCheck(this.last.type, pokers, this.last.pokers, this.game.cardsTypeConfig, this.game.gameOption)) {
                return this.last.type;
            }
            throw new ClientException(ErrorCode.PokerLessThanLast, {}, "牌比上家小");
        }
        // 如果和上家的牌型不一致
        const lastConfig = this.game.cardsTypeConfig[this.last.type];
        for (let thanType of lastConfig.than) {
            if (CardTypeIs(thanType, pokers, this.game.cardsTypeConfig, this.game.gameOption)) {
                return thanType
            }
        }
        throw new ClientException(ErrorCode.PokerIllegal, {}, "出牌不合法");
    }

    // 进入下一个玩家的回合
    enterNextPlayerRound() {
        if (this.round) clearTimeout(this.round.timer);
        const nextPlayer = this.getNextPlayer();
        this.round = {
            role: nextPlayer,
            locker: false,
            timer: setTimeout(() => {

            }, this.game.gameOption.roundTime * 1000)
        }
    }

    // 获取下一个打牌的人
    getNextPlayer(): RunFastRole {
        if (!this.round) {
            // TODO 这里需要确认谁先打牌
            return this.game.getRole(1);
        }
        const nowSeat = this.round.role.seat;
        if (nowSeat == this.game.gameOption.maxPlayer) return this.game.getRole(1);
        return this.game.getRole(nowSeat + 1);
    }

}