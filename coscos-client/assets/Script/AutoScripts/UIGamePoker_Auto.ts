

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIGamePoker_Auto extends cc.Component {
	@property(cc.Sprite)
	Background: cc.Sprite = null;
	@property(cc.Button)
	LeaveRoom: cc.Button = null;
	@property(cc.Label)
	RoomInfo: cc.Label = null;
	@property(cc.Button)
	StartGame: cc.Button = null;
 
}