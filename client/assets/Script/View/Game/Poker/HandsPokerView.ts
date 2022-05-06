import UIPackage = fgui.UIPackage;
import HandsPokerItem from "./HandsPokerItem";

export class HandsPokerView extends cc.Component {
    private _roomView: fgui.GComponent;
    private _obj: fgui.GObject;
    private _view: fgui.GComponent;
    private _list: fgui.GList;

    private _pokerSize = {width: 87, height: 120, interval: 30};

    constructor(roomView: fgui.GComponent) {
        super();
        this._roomView = roomView;
        this._obj = this._roomView.getChild("HandsArea");
        this._view = this._obj.asCom;

        fgui.UIObjectFactory.setExtension("ui://PokerGame/HandsPokerItem", HandsPokerItem);
        this._list = this._view.getChild("List").asList;
    }

    show() {
        this._obj.visible = true;
    }

    hidden() {
        this._obj.visible = false;
    }

    // 当收到卡牌之后
    async onReceivePoker(pokers: Array<{ rank: number, suit: number }>) {
        pokers.forEach(ele => {
            let item: HandsPokerItem = <HandsPokerItem>this._list.addItemFromPool();
            item.setPoker(ele);
            item.useFont();
        })
        this._list.ensureBoundsCorrect();


        let delay: number = 0;
        for (let item of this._list._children as Array<HandsPokerItem>) {
            if (this._list.isChildInView(item)) {
                item.playEffect(delay);
                delay += 0.2;
            } else
                break;
        }

        // this._view.height = this._pokerSize.height;
        //
        // const listWidth = this._view.width; // 整个列表的长度
        // const allPokerWidth = this._pokerSize.width + ((pokers.length - 1) * this._pokerSize.interval); // 所有扑克的长度, 带上中间的空隙
        // const startPosition = (listWidth - allPokerWidth) / 2; // 扑克的起始位置, 手牌居中排列
        //
        // for (let _index in pokers) {
        //     const poker = pokers[_index];
        //     // 属性
        //     const pokerObject = UIPackage.createObject("PokerGame", "HandsPoker");
        //     pokerObject.icon = `Poker/poker_${poker.suit}_${poker.rank}`;
        //     // pokerObject.setSize(this._pokerSize.width, this._pokerSize.height);
        //     // pokerObject.width = this._pokerSize.width;
        //     // pokerObject.height = this._pokerSize.height;
        //
        //     // 动画
        //     const pokerPositionX = startPosition + (parseInt(_index) * this._pokerSize.width)
        //     this._view.addChild(pokerObject);
        //     // pokerObject.x = listWidth;
        //     pokerObject.setPosition(pokerPositionX, -50);
        //     pokerObject.asCom.onClick(() => {
        //         console.log(123);
        //     })
        //
        //
        //     // await new Promise((resolve) => {
        //     //     fgui.GTween.to2(listWidth, 0, pokerPositionX, 0, 0.1).setTarget(pokerObject, pokerObject.setPosition).onComplete(() => {
        //     //         return resolve(null);
        //     //     })
        //     // })
        // }
    }


}