import {PushOperation, RequestOperation} from "./Operation";
import {OnReceivedPoker} from "./operation/OnReceivedPoker";
import {OnPhase} from "./operation/OnPhase";
import {OnPlayerRound} from "./operation/OnPlayerRound";
import {OnPlayerPlay} from "./operation/OnPlayerPlay";
import {RequestPlayPokers} from "./operation/RequestPlayPokers";
import {RequestPass} from "./operation/RequestPass";
import {RequestNotice} from "./operation/RequestNotice";
import {OnPlayerPass} from "./operation/OnPlayerPass";

export function OperationRequestFactory(operation: RequestOperation) {
    switch (operation) {
        case RequestOperation.RequestPlayPokers:
            return new RequestPlayPokers();
        case RequestOperation.RequestPass:
            return new RequestPass();
        case RequestOperation.RequestNotice:
            return new RequestNotice();
    }

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
        case PushOperation.OnPlayerPass:
            return new OnPlayerPass();
    }
}