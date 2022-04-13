export enum LoadType {
    /**
     * 配置
     */
    CONFIG,
    /**
     * 音效
     */
    SOUND,
    /**
     * 音乐
     */
    MUSIC,
    /**
     * 预制体
     */
    POOL_MANAGER,
}

export class PreloadManager {
    protected loadTypeList: Array<LoadType>;
    protected loadIndex: number = -1;
    protected _loadType: LoadType = LoadType.CONFIG;
    protected _progress: number = 0;
    protected _isLoading: boolean = false;
    protected finishCallback: Function;

    public reset() {
        this._isLoading = false;
    }

    public set progress(value: number) {
        this._progress = value;
    }

    public get progress(): number {
        return this._progress;
    }

    public set loadType(value: LoadType) {
        this._loadType = value;
    }

    public get loadType(): LoadType {
        return this._loadType;
    }

    public startPreLoad(finishCallback: () => void) {
        this._isLoading = true;
        this.finishCallback = finishCallback;
        this.loadTypeList = [LoadType.CONFIG, LoadType.SOUND, LoadType.MUSIC, LoadType.POOL_MANAGER];
        this.loadIndex = 0;
        this.loadType = this.loadTypeList[this.loadIndex];
        this.progress = this.loadIndex / this.loadTypeList.length;
        this.handleLoad();
    }

    protected handleLoad() {
        if (this.loadType == LoadType.CONFIG) {
            this.loadConfigData();
        } else if (this.loadType == LoadType.MUSIC) {
            this.loadMusic();
        } else if (this.loadType == LoadType.SOUND) {
            this.loadSound();
        } else if (this.loadType == LoadType.POOL_MANAGER) {
            this.loadPoolManager();
        }
    }

    protected loadOneTypeEnd() {
        if (!this._isLoading) {
            return;
        }
        this.loadIndex++;
        if (this.loadIndex >= this.loadTypeList.length) {
            this.loadType = this.loadTypeList[this.loadIndex];
            this.progress = this.loadIndex / this.loadTypeList.length;
            this._isLoading = false;
            this.finishCallback();
        } else {
            this.loadType = this.loadTypeList[this.loadIndex];
            this.progress = this.loadIndex / this.loadTypeList.length;
            this.handleLoad();
        }
    }

    /**
     * 加载配置
     */
    protected loadConfigData() {
        this.loadOneTypeEnd();
    }

    /**
     * 加载音效
     */
    protected loadSound() {
        this.loadOneTypeEnd();
    }

    /**
     * 加载音乐
     */
    protected loadMusic() {
        this.loadOneTypeEnd();
    }

    /**
     * 加载资源
     */
    protected loadPoolManager() {
        this.loadOneTypeEnd();
    }
}