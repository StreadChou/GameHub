import {AbstractRoom} from "./abstractRoom";
import {RoomPlayer} from "./roomPlayer";
import {CreateRoomDto} from "./dto/RoomDto";
import {pinus} from "pinus";
import {Channel} from "pinus/lib/common/service/channelService";


export class NormalRoom extends AbstractRoom {
    constructor(params: CreateRoomDto) {
        super();
    }


    join(player: RoomPlayer) {

    }
}