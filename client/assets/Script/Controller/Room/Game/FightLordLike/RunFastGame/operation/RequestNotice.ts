import {RequestOperation} from "../Operation";
import {RequestOption} from "../../../Base/RequestOption";
import {SelfGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfGameView";

export class RequestNotice extends RequestOption {
    option = RequestOperation.RequestNotice;

    response(data: any) {
        SelfGameView.instance.onNoticePoker(data);
    }
}