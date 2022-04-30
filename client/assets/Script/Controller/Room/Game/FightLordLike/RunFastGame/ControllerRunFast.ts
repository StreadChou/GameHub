import {AbstractGameController} from "../../AbstractGameController";
import Hall from "../../../../../View/Hall/Hall";
import FightLordLikeGameMain from "../../../../../View/Game/FightLordLikeGame/FightLordLikeGameMain";

export class ControllerRunFast extends AbstractGameController {
    private static _instance;


    public static getInstance(): ControllerRunFast {
        this._instance = this._instance ?? new ControllerRunFast();
        return this._instance;
    }

    onEnterRoom() {
        console.log("切换到对应的场景")
        Hall.instance.toGameMain(FightLordLikeGameMain);
    }
}