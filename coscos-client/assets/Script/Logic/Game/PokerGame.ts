import RoomController from "./Controller/RoomController";
import GameController from "./Controller/GameController";
import {SimpleEventMap} from "../Base/SimpleEventMap";
import {RoleController} from "./Controller/RoleController";

export default class PokerGame {
    private static _instance: PokerGame = null
    roomController: RoomController;
    gameController: GameController;
    roleController: RoleController;
    eventMap: SimpleEventMap;

    protected constructor() {
        this.eventMap = new SimpleEventMap();
        // 初始化controller
        this.roomController = new RoomController();
        this.gameController = new GameController();
        this.roleController = new RoleController();
    }

    public static get instance(): PokerGame {
        this._instance = this._instance ?? new PokerGame();
        return this._instance
    }

}