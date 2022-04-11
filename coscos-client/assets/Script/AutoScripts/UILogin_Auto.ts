

const {ccclass, property} = cc._decorator;
@ccclass
export default class UILogin_Auto extends cc.Component {
	@property(cc.Sprite)
	Background: cc.Sprite = null;
	@property(cc.Button)
	WechatLogin: cc.Button = null;
	@property(cc.Button)
	AccountLogin: cc.Button = null;
	@property(cc.Button)
	GuestLogin: cc.Button = null;
 
}