import {PushOption} from "../../../Base/PushOption";
import {UserServices} from "../../../../../../Model/UserServices";
import {SelfGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfGameView";
import {PlayerGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/PlayerGameView";
import {ControllerRunFast} from "../ControllerRunFast";
import {RunFastConfig} from "../../../../../../Constant/Game";

export class OnPlayerPlay extends PushOption {
    running(data: { uid: string, seat: number, pokers: Array<{ rank: number, suit: number }> }) {
        const user = UserServices.user;
        if (data.uid == user.uid) {
            SelfGameView.instance.onFoldPoker(data.pokers);
        } else {
            const showNumber = ControllerRunFast.getInstance().option.config[RunFastConfig.ShowCardsNumber];
            PlayerGameView.instance.onPlayerFoldPoker(data.seat, showNumber, data.pokers);
        }
    }
}