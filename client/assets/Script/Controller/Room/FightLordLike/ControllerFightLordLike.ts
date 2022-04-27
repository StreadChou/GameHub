import {AbstractGameController} from "../AbstractGameController";
import {RoomEntity, RoomServices} from "../../../Model/RoomServices";
import {RunFastGameOptions} from "../../../Constant/Game";

export class ControllerFightLordLike extends AbstractGameController {
    gameType;
    gameOption;

    get room(): RoomEntity {
        return RoomServices.room;
    }

    get options(): RunFastGameOptions {
        return <RunFastGameOptions>this.room.gameOption;
    }


}