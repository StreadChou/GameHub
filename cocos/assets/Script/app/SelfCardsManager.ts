import {_decorator, Component, Node} from 'cc';

const {ccclass, property} = _decorator;

/**
 * Predefined variables
 * Name = SelfCardsManager
 * DateTime = Sat Apr 09 2022 02:57:21 GMT+0800 (中国标准时间)
 * Author = stread
 * FileBasename = SelfCardsManager.ts
 * FileBasenameNoExtension = SelfCardsManager
 * URL = db://assets/Script/app/SelfCardsManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('SelfCardsManager')
export class SelfCardsManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */