export function OperateQueueDescriptor() {
    return function (this: any, target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalValue = descriptor.value
        descriptor.value = function (...args: any[]) {
            OperateQueue.instance.push(originalValue, args, this);
        }
    };
}

export class OperateQueue {
    private static _instance: OperateQueue
    queue: Array<{ operate: Function, args: Array<any> }> = [];

    static get instance(): OperateQueue {
        OperateQueue._instance = OperateQueue._instance ?? new OperateQueue();
        return OperateQueue._instance;
    }

    push(operate: Function, args: Array<any>, bindTo: any) {
        this.queue.push({operate: operate.bind(bindTo), args})
    }

    shift() {
        return this.queue.shift();
    }
}