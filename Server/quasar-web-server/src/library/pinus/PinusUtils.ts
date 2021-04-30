export default class PinusUtils {
  pinusInstance: PinusInterface;
  init: typeof PinusIntFunction;
  request: typeof PinusRequestFunction;

  static _instance: PinusUtils;

  private constructor() {
    // @ts-ignore see index.template.html
    this.pinusInstance = window.pinus;

    this.init = this.pinusInstance.init;
    this.request = this.pinusInstance.request;
  }

  static getInstance(): PinusUtils {
    this._instance = this._instance || new PinusUtils();
    return this._instance;
  }

  initSync(params: PinusInitParams): Promise<any> {
    return new Promise(resolve => {
      this.init(params, (response) => {
        resolve(response);
      })
    })
  }

  requestSync(route: string, body: string,): Promise<any> {
    return new Promise(resolve => {
      this.request(route, body, (response: any) => {
        resolve(response);
      })
    })
  }

}




