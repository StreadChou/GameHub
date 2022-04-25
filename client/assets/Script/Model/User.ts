import {ProtocolBase} from "../Base/ProtocolBase";

export class User extends ProtocolBase {
    protected static _instance: User;

    // public static getInstance(params?: any): User {
    //     this._instance = this._instance ?? new User(params)
    //     return this._instance;
    // }

    public static Login(message: any): User {
        if (this._instance) return this._instance;

    }

    setAttr() {

    }

    getAttr() {

    }

    setItem() {

    }

    getItem() {

    }
}