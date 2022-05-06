import {UserServices} from "../../../../../../Model/UserServices";
import {SelfGameView} from "../../../../../../View/Game/FightLordLikeGame/Component/SelfGameView";

export class OnReceivedPoker {
    running(data: any) {
        const main = UserServices.user;

        if (data.uid == main.uid) {
            this.selfReceivedPoker(data.pokers);
        }

    }

    selfReceivedPoker(pokers: Array<{ rank: number, suit: number }>) {
        SelfGameView.instance.onReceivedPoker(pokers);
    }

    otherReceivedPoker(number: number) {
        
    }
}