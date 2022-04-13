import {ErrorCode} from "../ErrorCode";
import {PokerClientDto} from "./DtoConstant";
import {GameOptions} from "../Game";


export class DefaultResponse {
    code: ErrorCode
    data?: any
    message?: string
}

export class RequestRoomRoomHandlerCreateRoom {
    gameOption: GameOptions;
}

export class ResponseRoomRoomHandlerCreateRoom extends DefaultResponse {
    data: {
        uid: string
        roomId: number
    }
}


export class RequestRoomRoomHandlerJoinRoom {
    roomId: number
}

export class ResponseRoomRoomHandlerJoinRoom extends DefaultResponse {
    data: {
        roomId: number
    }
}


export class RequestRoomRoomHandlerStartGame {
    roomId: number
}

export class ResponseRoomRoomHandlerStartGame extends DefaultResponse {
    data: {
        roomId: number
    }
}


export class RequestRoomGameHandlerPlay {
    roomId: number;
    cards: Array<PokerClientDto>
}

export class ResponseRoomGameHandlerPlay extends DefaultResponse {
    data: {
        roomId: number
    }
}

