import {PushOption} from "../../../Base/PushOption";
import {PlayerGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/PlayerGameView";
import {SelfGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfGameView";
import {UserServices} from "../../../../../../Model/UserServices";
import {ControllerRunFast} from "../ControllerRunFast";
import {RunFastConfig} from "../../../../../../Constant/Game";

export class OnPlayerPass extends PushOption {
    running(data: { uid: string, seat: number, }) {
        const main = UserServices.user;

        if (data.uid == main.uid) {
            SelfGameView.instance.onPlayerPass();
        } else {
            PlayerGameView.instance.onPlayerPass(data.seat);
        }
    }
}