import {GameController} from "./Controller/GameController";
import {RoomController} from "./Controller/RoomController";
import {RoleController} from "./Controller/RoleController";

export class FightLordLikeGame {
    private static _instance: FightLordLikeGame = null
    public gameController: GameController;
    public roomController: RoomController
    public roleController: RoleController

    loaded: boolean = false;
    loadedOperate: Array<{ func: Function, params: Array<any> }> = [];


    constructor() {
        this.gameController = new GameController();
        this.roomController = new RoomController();
        this.roleController = new RoleController();
    }

    public static get instance(): FightLordLikeGame {
        this._instance = this._instance ?? new FightLordLikeGame();
        return this._instance
    }

    addLadedOperate(func: Function, params: Array<any>) {
        this.loadedOperate.push({func, params})
    }

    runLadedOperate() {
        const operate = this.loadedOperate.shift();
        if (!operate) return null;
        operate.func(...operate.params);
    }

    update(dt: number) {

        if (this.loaded) {
            this.runLadedOperate();
        }
    }

}