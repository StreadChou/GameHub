/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_SceneAUth from "./UI_SceneAUth";
import UI_LoginPanel from "./UI_LoginPanel";
import UI_RegisterPanel from "./UI_RegisterPanel";

export default class SceneAuthBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_SceneAUth.URL, UI_SceneAUth);
		fgui.UIObjectFactory.setExtension(UI_LoginPanel.URL, UI_LoginPanel);
		fgui.UIObjectFactory.setExtension(UI_RegisterPanel.URL, UI_RegisterPanel);
	}
}