import {AbstractController} from "../../../Abstract/AbstractController";

export class RoomLogicController extends AbstractController {
    static _instance: RoomLogicController;

    static get instance() {
        this._instance = this._instance || new RoomLogicController()
        return this._instance;
    }

    constructor() {
        super();
    }


    createRoom() {

    }
}