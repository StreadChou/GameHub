export abstract class AbstractGameController {

    abstract onEnterRoom();

    abstract reloadPlayer();

    abstract onPushOperation(operation: string, data: any);


}