import {boot} from 'quasar/wrappers';
import PinusUtils from "src/library/pinus/PinusUtils";

const pinusUtils = PinusUtils.getInstance()

declare module 'vue/types/vue' {
  interface Vue {
    $pinus: PinusUtils;
  }
}

// @ts-ignore see index.template.html
export const pinus = window.pinus;


export default boot(({Vue}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$pinus = pinusUtils;
});
