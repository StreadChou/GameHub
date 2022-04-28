export class C2SLoginVO {
    token: string;
}

// 游客登录
export class C2SGuestLoginVO {

}

// 登录成功的回文
export class S2COnLogin {
    attr: {
        uid: string,
        nick: string,
        level: number,
        money: number,
    }
}