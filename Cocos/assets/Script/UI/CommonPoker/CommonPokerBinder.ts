/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_CommonPoker from "./UI_CommonPoker";
import UI_UserCover from "./UI_UserCover";
import UI_TopUserInfo from "./UI_TopUserInfo";
import UI_LeftUserInfo from "./UI_LeftUserInfo";

export default class CommonPokerBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_CommonPoker.URL, UI_CommonPoker);
		fgui.UIObjectFactory.setExtension(UI_UserCover.URL, UI_UserCover);
		fgui.UIObjectFactory.setExtension(UI_TopUserInfo.URL, UI_TopUserInfo);
		fgui.UIObjectFactory.setExtension(UI_LeftUserInfo.URL, UI_LeftUserInfo);
	}
}