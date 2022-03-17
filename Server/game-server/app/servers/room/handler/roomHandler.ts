import {Application, FrontendSession} from 'pinus';

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    constructor(private app: Application) {

    }

    async createRoom(msg: any, session: FrontendSession) {

        return {code: 200, msg: 'game server is ok.'};
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