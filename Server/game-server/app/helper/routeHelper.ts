import {pinus, ServerInfo} from 'pinus';
import {crc} from 'crc';


export function dispatchRandom(serverType: string, uid: string): ServerInfo {
    const serverList = pinus.app.getServersByType(serverType);
    const index = Math.abs(crc.crc32(uid)) % serverList.length;
    return serverList[index];
}


export function dispatchUserLogic(uid: string): string {
    return "";
}