

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIHall_Auto extends cc.Component {
	@property(cc.Sprite)
	Background: cc.Sprite = null;
	@property(cc.Node)
	TopInfo: cc.Node = null;
	@property(cc.Node)
	RoomList: cc.Node = null;
	@property(cc.Node)
	FeatureList: cc.Node = null;
	@property(cc.Node)
	CreateButtonLayout: cc.Node = null;
	@property(cc.Node)
	Operation: cc.Node = null;
 
}