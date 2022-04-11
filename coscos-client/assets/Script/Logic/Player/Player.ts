import {PlayerController} from "./Controller/PlayerController";

export class Player {
    private static _instance: Player = null
    public playerController: PlayerController;

    uid: string = "";

    nick: string = "";

    level: number = 1;

    money: number = 0;


    private constructor() {
        this.playerController = new PlayerController(this);
    }

    public static get instance(): Player {
        this._instance = this._instance ?? new Player();
        return this._instance
    }

}