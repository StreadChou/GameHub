import {RoomServices} from "../../../../../../Model/RoomServices";
import {RequestOperation} from "../Operation";
import {RequestOption} from "../../../Base/RequestOption";

export class RequestPlayPokers extends RequestOption {
    request(data) {
        RoomServices.instance.requestGameOperation(RequestOperation.RequestPlayPokers, data);
    }

    response(data) {

    }
}