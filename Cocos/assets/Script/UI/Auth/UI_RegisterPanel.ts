/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_RegisterPanel extends fgui.GComponent {

	public m_main:fgui.GTextField;
	public static URL:string = "ui://bo84ikbpz5jv2";

	public static createInstance():UI_RegisterPanel {
		return <UI_RegisterPanel>(fgui.UIPackage.createObject("Auth", "RegisterPanel"));
	}

	protected onConstruct():void {
		this.m_main = <fgui.GTextField>(this.getChildAt(0));
	}
}