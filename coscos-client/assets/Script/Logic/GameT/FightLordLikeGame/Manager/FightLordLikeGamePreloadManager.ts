import {PreloadManager} from "../../../Game/Manager/PreloadManager";

export class FightLordLikeGamePreloadManager extends PreloadManager {

    // 加载配置
    protected loadConfigData() {
        this.loadOneTypeEnd();
    }

    // 加载音效
    protected loadSound() {
        this.loadOneTypeEnd();
    }

    // 加载音乐
    protected loadMusic() {
        this.loadOneTypeEnd();
    }


    // 加载资源
    protected loadPoolManager() {
        let beginProgress = this.progress;
        cc.resources.load("Pool/RolePoolManager", cc.Prefab, (finish: number, total: number, item: cc.AssetManager.RequestItem) => {
            let precent = finish / total / this.loadTypeList.length;
            if (beginProgress + precent > this.progress) {
                this.progress = beginProgress + precent;
            }
        }, (error: Error, asset: cc.Prefab) => {
            let managerPool = cc.instantiate(asset);
            cc.director.getScene().addChild(managerPool);
            this.loadOneTypeEnd();
        });
    }
}