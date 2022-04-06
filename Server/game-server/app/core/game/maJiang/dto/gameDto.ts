import {PokerClientDto} from "../../core/poker/pokerDto";

export interface OnReceivedPokerMessage {
    uid: string
    number: number
    cards?: Array<PokerClientDto>
}