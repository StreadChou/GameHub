/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_CommonWindowFrame from "./UI_CommonWindowFrame";
import UI_AlertWindow from "./UI_AlertWindow";
import UI_AlertWindowFullScreen from "./UI_AlertWindowFullScreen";

export default class CommonBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_CommonWindowFrame.URL, UI_CommonWindowFrame);
		fgui.UIObjectFactory.setExtension(UI_AlertWindow.URL, UI_AlertWindow);
		fgui.UIObjectFactory.setExtension(UI_AlertWindowFullScreen.URL, UI_AlertWindowFullScreen);
	}
}