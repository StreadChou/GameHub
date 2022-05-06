import {UserServices} from "../../../../../../Model/UserServices";
import {SelfGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfGameView";
import {PlayerGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/PlayerGameView";

export class OnPlayerRound {
    running(data: { time: number, uid: string, seat: number }) {
        const main = UserServices.user;
        if (data.uid == main.uid) {
            SelfGameView.instance.onRoundStart(data.time)
        } else {
            SelfGameView.instance.onOtherRound()
            PlayerGameView.instance.onEnterPlayerRound(data.seat, data.time);
        }
    }
}