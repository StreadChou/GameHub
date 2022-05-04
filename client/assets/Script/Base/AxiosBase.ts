import axios, {AxiosError} from "axios";
import {EventSystem} from "../Event/EventSystem";
import {EVENT} from "../Event/EventDefine";

const api = axios.create({baseURL: "http://127.0.0.1:3000"});
api.interceptors.response.use((response) => {
    return response;
}, (error: AxiosError) => {
    const data = {
        code: 0,
        message: "未知错误, 请稍后再试",
        title: null
    };
    if (error.code == "ERR_NETWORK") {
        data.code = 500;
        data.message = "服务器正在维护中"
    } else {
        switch (error.response.status) {
            case 401:
                data.message = "登录过期或者密码错误!"
                break;
            default:
                if (error.response.data.hasOwnProperty("message")) {
                    data.message = (error.response.data as any).message
                }
        }
        data.code = error.response.status;
    }
    EventSystem.instance.fire(EVENT.ON_ERROR_CODE, data)
})


export {api};