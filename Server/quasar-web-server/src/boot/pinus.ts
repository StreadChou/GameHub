import {boot} from 'quasar/wrappers';

declare interface PinusInterface {
  request(route: string, body: string, callback: any): void;

  init(params: {
    host: string,
    port: string,
    log: boolean,
  }, callback: any): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $pinus: PinusInterface;
  }
}

// @ts-ignore see index.template.html
export const pinus = window.pinus;


export default boot(({Vue}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$pinus = pinus;
});
