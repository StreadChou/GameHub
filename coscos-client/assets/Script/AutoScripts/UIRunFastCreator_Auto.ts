

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIRunFastCreator_Auto extends cc.Component {
	@property(cc.Label)
	Title: cc.Label = null;
	@property(cc.ToggleContainer)
	PlayerNumber: cc.ToggleContainer = null;
	@property(cc.Toggle)
	ConfigMust: cc.Toggle = null;
	@property(cc.Toggle)
	FourWithThree: cc.Toggle = null;
	@property(cc.Toggle)
	AABoom: cc.Toggle = null;
 
}