/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_LoginMain extends fgui.GComponent {

	public m_GuestLoginButton:fgui.GButton;
	public m_AccountLoginButton:fgui.GButton;
	public m_WechatLoginButton:fgui.GButton;
	public static URL:string = "ui://bo84ikbpc97bn";

	public static createInstance():UI_LoginMain {
		return <UI_LoginMain>(fgui.UIPackage.createObject("Auth", "LoginMain"));
	}

	protected onConstruct():void {
		this.m_GuestLoginButton = <fgui.GButton>(this.getChildAt(4));
		this.m_AccountLoginButton = <fgui.GButton>(this.getChildAt(5));
		this.m_WechatLoginButton = <fgui.GButton>(this.getChildAt(6));
	}
}