/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_CommonWindowFrame from "./UI_CommonWindowFrame";

export default class UI_AlertWindow extends fgui.GComponent {

	public m_frame:UI_CommonWindowFrame;
	public m_Title:fgui.GTextField;
	public m_Message:fgui.GTextField;
	public m_CodeValue:fgui.GTextField;
	public static URL:string = "ui://bjc65ilgiv7g3";

	public static createInstance():UI_AlertWindow {
		return <UI_AlertWindow>(fgui.UIPackage.createObject("Common", "AlertWindow"));
	}

	protected onConstruct():void {
		this.m_frame = <UI_CommonWindowFrame>(this.getChildAt(0));
		this.m_Title = <fgui.GTextField>(this.getChildAt(1));
		this.m_Message = <fgui.GTextField>(this.getChildAt(2));
		this.m_CodeValue = <fgui.GTextField>(this.getChildAt(3));
	}
}