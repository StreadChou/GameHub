/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_LoginMain from "./UI_LoginMain";
import UI_LoginPanel from "./UI_LoginPanel";
import UI_RegisterPanel from "./UI_RegisterPanel";

export default class AuthBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_LoginMain.URL, UI_LoginMain);
		fgui.UIObjectFactory.setExtension(UI_LoginPanel.URL, UI_LoginPanel);
		fgui.UIObjectFactory.setExtension(UI_RegisterPanel.URL, UI_RegisterPanel);
	}
}