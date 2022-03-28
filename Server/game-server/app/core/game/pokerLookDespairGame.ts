import {AbstractGame} from "./abstractGame";

export class PokerLookDespairGame extends AbstractGame {
    // 是否显示牌的数量
    showNumber: boolean = true;
    // 总牌数
    maxCardNumber: number = 15;
    // 自己回合能出牌必须出牌
    mustTurn: boolean = true;
    // 玩家数量
    playerNumber: number = 2;
    // 允许四带二

    // 允许四代三

    // 自动提示
    autoNotice: boolean = true;
    // 飞机可以少带接完

    // 三张可少带接完

    // N秒后机器人自动托管
    robotTime: number = 60;
    // 系统切牌

    // 翻倍牌

    // 随机先手, 0 关闭, 1 开启, -1 仅第一局
    randomStart: number = -1
    // 不飘分

    // 不翻倍

    // 不封顶

    // 低于100分禁止进房

    // 低于50分自动解散

    // 房间信道

    startGame() {

    }

    // 检查出牌是否合法
    checkCardLegal() {

    }

    // 检查当前牌是否可以压住上家牌
    checkCardHigher() {

    }


}