declare function PinusIntFunction(params: PinusInitParams, callback: typeof PinusInitCallback): void;

declare interface PinusInitParams {
  host: string,
  port: string,
  log: boolean,
}

declare function PinusInitCallback(data: any): void;
