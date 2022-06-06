/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_UserCover extends fgui.GButton {

	public m_Background:fgui.GGraph;
	public static URL:string = "ui://b557p5phpvr49";

	public static createInstance():UI_UserCover {
		return <UI_UserCover>(fgui.UIPackage.createObject("CommonPoker", "UserCover"));
	}

	protected onConstruct():void {
		this.m_Background = <fgui.GGraph>(this.getChildAt(0));
	}
}