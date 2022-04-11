import {EVENT} from "../Event/EventDefine";
import {EventSystem} from "../Event/EventSystem";
import {ProtocolBase} from "./ProtocolBase";

export class ControllerBase {
    private _eventMap: Map<EVENT, number>;
    private _isFinalized: boolean = false;
    protected _protocolIns?: ProtocolBase;

    constructor() {
        this._eventMap = new Map<EVENT, number>();
        this._isFinalized = true;
        this.init()
    }

    private init() {
        this.initEvents();
        this.onInit();
    }

    finalize() {
        if (this._isFinalized == false) {
            return;
        }
        this.unregisterAllEvents();
        this.removeProtocol();
        this.onFinalize();
        this._isFinalized = false;
    }

    protected onInit() {
        //子类重写此方法
    }

    protected onFinalize() {
        //子类重写此方法
    }

    protected initEvents() {
        //初始化事件列表
    }

    protected registerEvent(event: EVENT, func: (...parmas: any) => void) {
        if (this._eventMap.has(event)) {
            return;
        }
        let eventId = EventSystem.instance.register(event, func);
        this._eventMap.set(event, eventId);
        return eventId;
    }

    protected unregisterEvent(event: EVENT) {
        let eventId = this._eventMap.get(event);
        if (eventId) {
            EventSystem.instance.unregister(eventId);
            this._eventMap.delete(event);
        }
    }

    private unregisterAllEvents() {
        this._eventMap.forEach(element => {
            EventSystem.instance.unregister(element);
        });
        this._eventMap.clear();
    }

    protected addProtocol() {
        this._protocolIns?.addProtocols();
    }

    protected removeProtocol() {
        this._protocolIns?.removeProtocols();
    }

    sendMsg(cmd: string, msg: any) {
        this._protocolIns?.sendMsg(cmd, msg);
    }

    isFinalized() {
        return this._isFinalized;
    }

    getProtocol() {
        return this._protocolIns;
    }

    getData() {
        return this._protocolIns!.data;
    }

    getDataByCMD(cmd: string) {
        return this._protocolIns!.getDataByCMD(cmd);
    }
}