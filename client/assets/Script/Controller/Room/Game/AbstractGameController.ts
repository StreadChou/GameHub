
export abstract class AbstractGameController {

    abstract onEnterRoom();

    abstract reloadPlayer();

    abstract onPushOperation(operation: string, data: any);

    abstract requestOperation(operation: any, data: any)

    abstract onResponseOperation(operation: string, data: any);


}