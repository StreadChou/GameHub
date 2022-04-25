import {EVENT} from "./EventDefine";
import {EventSystem} from "./EventSystem";

export class SimpleEventMap {
    private _eventMap: Map<EVENT, number>;

    constructor() {
        this._eventMap = new Map<EVENT, number>();
    }

    public registerEvent(event: EVENT, func: (...params: any) => void) {
        if (this._eventMap.has(event)) {
            return;
        }
        let eventId = EventSystem.instance.register(event, func);
        this._eventMap.set(event, eventId);
        return eventId;
    }

    public unregisterEvent(event: EVENT) {
        let eventId = this._eventMap.get(event);
        if (eventId) {
            EventSystem.instance.unregister(eventId);
            this._eventMap.delete(event);
        }
    }

    public unregisterAllEvents() {
        this._eventMap.forEach(element => {
            EventSystem.instance.unregister(element);
        });
        this._eventMap.clear();
    }
}
