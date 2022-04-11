import FormMgr from "../../UIFrame/FormMgr";
import UIConfig from "../../UIConfig";
import UIError from "../../UIScript/Tips/UIError";

export class TipsManager {
    private static _instance: TipsManager | undefined;

    static getInstance() {
        if (!this._instance) {
            this._instance = new TipsManager();
        }
        return this._instance;
    }

    //#region string Tips
    private _strQueue: Array<string> = new Array<string>();

    private _tipsView: UIError | undefined;

    private _isTipsLoading: boolean = false;

    async showTips(str: string) {
        this._strQueue.push(str);
        if (!this._tipsView) {
            if (this._isTipsLoading) {
                return;
            }
            this._isTipsLoading = true;
            let view = await FormMgr.open(UIConfig.UIError, this.popTips.bind(this));
            this._isTipsLoading = false;
            this._tipsView = view as UIError;
            this.popTips();
        } else {
            this.popTips();
        }
    }

    private popTips() {
        let length = this._strQueue.length;
        if (length == 0) {
            this._tipsView!.closeSelf();
            this._tipsView = undefined;
            return;
        }
        let str = this._strQueue[0];
        this._strQueue.splice(0, 1);
        this._tipsView!.showTips(str);
    }
}