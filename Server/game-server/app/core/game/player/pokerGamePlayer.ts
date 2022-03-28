import {RoomPlayer} from "../../room/component/roomPlayer";
import {PokerCard} from "../../poker/pokerCard";
import {AbstractGamePlayer} from "./abstractGamePlayer";

export class PokerGamePlayer extends AbstractGamePlayer {

    playerCards: PokerCard[] = [];

    async generateGamePlayerByRoomPlayer(player: RoomPlayer) {

    }

    async canSeeAllCard(): Promise<boolean> {
        return true;
    }
}