interface EventData {
    eventId: number;
    eventKey: string;
    isEnabled: boolean;
    func: (...args: any) => void;
}

export class EventSystem {
    private static _instance: EventSystem | null = null
    public static get instance(): EventSystem {
        if (!this._instance) {
            this._instance = new EventSystem()
        }
        return this._instance
    }

    private _eventsDic: Map<string, Array<EventData>>;
    private _eventDataDic: Map<number, EventData>;
    private _firingEventKeys: Set<string>;   //当前正在派发的事件
    private _delayAddEventDataDic: Map<string, Array<EventData>>;
    private _delayDeleteEventIdDic: Map<string, Array<number>>;
    private _increasingId: number = 0;

    private constructor() {
        this._eventsDic = new Map<string, Array<EventData>>();
        this._eventDataDic = new Map<number, EventData>();
        this._firingEventKeys = new Set<string>();
        this._delayAddEventDataDic = new Map<string, Array<EventData>>();
        this._delayDeleteEventIdDic = new Map<string, Array<number>>();
    }

    //派发事件
    public fire(eventKey: string | number, ...args: any) {
        eventKey = eventKey.toString();
        //派发事件
        if (this._eventsDic.has(eventKey)) {
            this._firingEventKeys.add(eventKey);
            let eventDataArr = this._eventsDic.get(eventKey);
            for (let eventData of eventDataArr!) {
                if (eventData.isEnabled) {
                    eventData.func(...args);
                }
            }
            this._firingEventKeys.delete(eventKey);
        } else {
            return;
        }

        //延迟删除事件
        if (this._delayDeleteEventIdDic.has(eventKey)) {
            let deleteEventIdArr = this._delayDeleteEventIdDic.get(eventKey);
            for (let eventId of deleteEventIdArr!) {
                this.unregister(eventId);
            }
            this._delayDeleteEventIdDic.delete(eventKey);
        }

        //延迟添加事件
        if (this._delayAddEventDataDic.has(eventKey)) {
            let addEventDataArr = this._delayAddEventDataDic.get(eventKey);
            for (let eventData of addEventDataArr!) {
                if (eventData.isEnabled) {
                    this.addEventData(eventData);
                }
            }
            this._delayAddEventDataDic.delete(eventKey);
        }

    }

    public register(eventKey: string | number, func: (...args: any) => void): number {
        eventKey = eventKey.toString();
        let id = ++this._increasingId;
        let eventData: EventData = {
            eventId: id,
            eventKey: eventKey,
            isEnabled: true,
            func: func,
        };
        this._eventDataDic.set(id, eventData);
        if (!this._firingEventKeys.has(eventKey)) {
            this.addEventData(eventData);
        } else {
            let eventDataArr: Array<EventData>;
            if (this._delayAddEventDataDic.has(eventKey)) {
                eventDataArr = this._delayAddEventDataDic.get(eventKey)!;
            } else {
                eventDataArr = new Array<EventData>();
                this._delayAddEventDataDic.set(eventKey, new Array<EventData>())
            }
            eventDataArr.push(eventData);
        }
        return id;
    }

    private addEventData(eventData: EventData) {
        let eventKey = eventData.eventKey;
        let eventDataArr: Array<EventData>;
        if (!this._eventsDic.has(eventKey)) {
            eventDataArr = new Array<EventData>();
            this._eventsDic.set(eventKey, eventDataArr);
        } else {
            eventDataArr = this._eventsDic.get(eventKey)!;
        }
        eventDataArr.push(eventData);
    }

    public unregister(eventId: number) {
        //取消注册
        if (!this._eventDataDic.has(eventId)) {
            console.warn("EventSystem unregister => no this eventId!", eventId);
            return;
        }
        let eventData = this._eventDataDic.get(eventId)!;
        let eventKey = eventData.eventKey;
        if (!this._firingEventKeys.has(eventKey)) {
            this._eventDataDic.delete(eventId);
            let eventDataArr = this._eventsDic.get(eventKey);
            if (eventDataArr) {
                let index = eventDataArr.indexOf(eventData);
                if (index > -1) {
                    eventDataArr.splice(index, 1);
                }
            }
        } else {
            eventData.isEnabled = false;
            let eventDataArr: Array<number>;
            if (this._delayDeleteEventIdDic.has(eventKey)) {
                eventDataArr = this._delayDeleteEventIdDic.get(eventKey)!;
            } else {
                eventDataArr = new Array<number>();
                this._delayDeleteEventIdDic.set(eventKey, eventDataArr);
            }
            eventDataArr.push(eventData.eventId);
        }
    }
}