import {Application, FrontendSession} from 'pinus';
import {SessionAttr} from "../../../constant/session";
import {RoomManager} from "../../../core/room/roomManager";

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    roomManager: RoomManager;

    constructor(private app: Application) {

    }

    async createRoom(msg: any, session: FrontendSession) {
        const uid = session.uid;
        const logic = session.get(SessionAttr.LogicServerId);
        await this.roomManager.createRoom({});
        return {code: 200, msg: {uid, logic}};
    }

    async selectGameType(msg: any, session: FrontendSession) {

    }

    async joinRoom(msg: any, session: FrontendSession) {
        return {code: 200, msg: 'game server is ok.'};
    }

    async leaveRoom(msg: any, session: FrontendSession) {
        return {code: 200, msg: 'game server is ok.'};
    }

    async startGame() {

    }

}