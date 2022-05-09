import {RequestOperation} from "../FightLordLike/RunFastGame/Operation";
import {RoomServices} from "../../../../Model/RoomServices";

export abstract class RequestOption {
    abstract option: RequestOperation;

    request(data: any) {
        RoomServices.instance.requestGameOperation(this.option, data);
    }

    response(data: any) {

    }
}