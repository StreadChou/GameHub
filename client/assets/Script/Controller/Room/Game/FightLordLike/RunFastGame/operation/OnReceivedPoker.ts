import {UserServices} from "../../../../../../Model/UserServices";
import {SelfGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfGameView";
import {PlayerGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/PlayerGameView";
import {ControllerRunFast} from "../ControllerRunFast";
import {RunFastConfig} from "../../../../../../Constant/Game";
import {PushOption} from "../../../Base/PushOption";

export class OnReceivedPoker extends PushOption{
    running(data: { uid: string, seat: number, number: number, pokers: Array<any> }) {
        const main = UserServices.user;

        if (data.uid == main.uid) {
            this.selfReceivedPoker(data.pokers);
        } else {
            this.otherReceivedPoker(data.seat, data.number)
        }

    }

    selfReceivedPoker(pokers: Array<{ rank: number, suit: number }>) {
        SelfGameView.instance.onReceivedPoker(pokers);
    }

    otherReceivedPoker(seat: number, number: number,) {
        const showNumber = ControllerRunFast.getInstance().option.config[RunFastConfig.ShowCardsNumber];
        PlayerGameView.instance.onReceivedPoker(seat, showNumber, number)
    }
}