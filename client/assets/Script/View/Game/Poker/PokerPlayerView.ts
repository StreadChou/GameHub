import UIPackage = fgui.UIPackage;

export class PokerPlayerView extends cc.Component {
    public seat: number;
    public position: "left" | "right" | "top"; // 位置

    private _obj: fgui.GObject;
    private _view: fgui.GComponent;
    private _roomView: fgui.GComponent;
    private _pokerSize = {width: 87, height: 120, interval: 30};


    /**
     * @param roomView 房间的场景
     * @param mainSeat 当前客户端的座位号
     * @param playerSeat 当前这个view所属玩家的座位号
     * @param maxNumber 房间最大人数
     */
    constructor(roomView: fgui.GComponent, mainSeat: number, playerSeat: number, maxNumber: number) {
        super();
        this.seat = playerSeat;
        this._roomView = roomView;
        this.position = this.getIndexBySeat(mainSeat, playerSeat, maxNumber);

        this.setPosition(this.position);
        this._obj.visible = true;
    }

    getIndexBySeat(selfSeat: number, targetSeat: number, maxNumber: number): "left" | "right" | "top" {
        if (maxNumber == 2) {
            return "top";
        }

        if (maxNumber == 3) {
            let _3_index = targetSeat - selfSeat;
            if (_3_index <= 0) _3_index += maxNumber;
            switch (_3_index) {
                case 1:
                    return "right"
                case 2:
                    return "left"
            }
        }

        if (maxNumber == 4) {
            let _4_index = targetSeat - selfSeat;
            if (_4_index <= 0) _4_index += maxNumber;
            switch (_4_index) {
                case 1:
                    return "right"
                case 2:
                    return "top"
                case 3:
                    return "left"
            }
        }
    }

    setPosition(position: "left" | "right" | "top") {
        let index, view;
        switch (position) {
            case "top":
                index = 2;
                view = "TopView";
                break;
            case "left":
                index = 3;
                view = "LeftView";
                break;
            case "right":
                index = 1;
                view = "RightView";
                break;
        }
        this._obj = this._roomView.getChild(`Player_${index}`);
        this._view = this._obj.asCom;
        this._view.getTransition(view).play(() => {
            this._obj.visible = true;
        });
    }

}