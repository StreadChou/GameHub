import {Application, FrontendSession} from 'pinus';

export default function (app: Application) {
    return new Handler(app);
}


export class Handler {
    constructor(private app: Application) {

    }
}