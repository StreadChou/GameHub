import {PushOperation} from "./Operation";
import {OnReceivedPoker} from "./operation/OnReceivedPoker";
import {OnPhase} from "./operation/OnPhase";
import {OnPlayerRound} from "./operation/OnPlayerRound";
import {OnPlayerPlay} from "./operation/OnPlayerPlay";

export function OperationRequestFactory() {

}

export function OperationPushFactory(operation: PushOperation) {
    switch (operation) {
        case PushOperation.OnReceivedPoker:
            return new OnReceivedPoker();
        case PushOperation.OnPhase:
            return new OnPhase();
        case PushOperation.OnPlayerRound:
            return new OnPlayerRound();
        case PushOperation.OnPlayerPlay:
            return new OnPlayerPlay();
    }
}