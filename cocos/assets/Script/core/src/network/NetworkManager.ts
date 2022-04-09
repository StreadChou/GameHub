declare global {
    interface PinusInterface {
        init: Function
        request: Function
        on: Function
    }

    interface Window {
        pinus: PinusInterface
        pomelo: PinusInterface
    }
}

export class NetworkManager {
    private static _instance: NetworkManager;
    private pinus = window.pomelo;

    private constructor() {
        this.init();
    }

    public static getInstance() {
        this._instance = this._instance || new NetworkManager();
        return this._instance;
    }

    init(host = "127.0.0.1", port = 3010, callback?: Function) {
        // host = "117.22.253.110";
        // port = 64030;
        this.pinus.init({
            host: host,
            port: port,
            log: true
        }, (data) => {
            callback && callback(data);
        });
    }


    request(route: string, data: any, callback?: Function) {
        this.writeRequestLog(route, data);
        this.pinus.request(route, data, (response: any) => {
            this.writeResponseLog(route, data, response)
            callback && callback(response);
        });
    }

    listenRouteList(routeList: Array<string>, callback?: Function) {
        routeList.forEach(route => {
            this.pinus.on(route, (data: any, info: any) => {
                callback && callback(route, data, info);
                this.writeListenLog(route, data, info)
            })
        })
    }

    listenRoute(route: string, callback?: Function) {
        this.pinus.on(route, (data: any, info: any) => {
            callback && callback(route, data, info);
            this.writeListenLog(route, data, info)
        })
    }


    writeRequestLog(route: string, data: any) {
        console.log(`发送请求: ${route}, ${JSON.stringify(data)}`)
    }

    writeResponseLog(route: string, data: any, response: any) {
        console.log(`收到回文: ${route}, ${JSON.stringify(response)}`)
    }

    writeListenLog(route: string, data: any, info: any) {
        console.log(`收到通知: ${route}, ${JSON.stringify(data)}, ${info}`)
    }

}