

const {ccclass, property} = cc._decorator;
@ccclass
export default class UINotice_Auto extends cc.Component {
	@property(cc.Label)
	Message: cc.Label = null;
 
}