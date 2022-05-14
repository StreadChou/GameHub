/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_LoginPanel extends fgui.GComponent {

	public m_main:fgui.GTextField;
	public static URL:string = "ui://bo84ikbpz5jv1";

	public static createInstance():UI_LoginPanel {
		return <UI_LoginPanel>(fgui.UIPackage.createObject("SceneAuth", "LoginPanel"));
	}

	protected onConstruct():void {
		this.m_main = <fgui.GTextField>(this.getChildAt(0));
	}
}