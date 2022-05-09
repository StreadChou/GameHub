import {UserServices} from "../../../../../../Model/UserServices";
import {SelfGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfGameView";
import {PlayerGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/PlayerGameView";
import {PushOption} from "../../../Base/PushOption";

export class OnPlayerRound extends PushOption {
    running(data: { time: number, uid: string, seat: number, newRound: boolean }) {
        const main = UserServices.user;
        PlayerGameView.instance.clearAllPlayerTimer();

        if (data.newRound) {
            PlayerGameView.instance.reloadAllGameView();
            SelfGameView.instance.reloadAllGameView()
        }

        if (data.uid == main.uid) {
            SelfGameView.instance.onRoundStart(data.time, data.newRound)
        } else {
            SelfGameView.instance.onOtherRound()
            PlayerGameView.instance.onEnterPlayerRound(data.seat, data.time);
        }
    }
}