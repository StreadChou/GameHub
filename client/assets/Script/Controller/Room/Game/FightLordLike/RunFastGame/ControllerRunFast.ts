import {AbstractGameController} from "../../AbstractGameController";
import Hall from "../../../../../View/Hall/Hall";
import FightLordLikeGameMain from "../../../../../View/Game/FightLordLikeGame/FightLordLikeGameMain";
import Entry from "../../../../../Entry";

export class ControllerRunFast extends AbstractGameController {
    private static _instance;


    public static getInstance(): ControllerRunFast {
        this._instance = this._instance ?? new ControllerRunFast();
        return this._instance;
    }

    onEnterRoom() {
        Entry.instance.changeScenes(FightLordLikeGameMain)
    }

}