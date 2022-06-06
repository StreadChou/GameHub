/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_SceneAuth extends fgui.GComponent {

	public m_RepairButton:fgui.GButton;
	public m_GuestLoginButton:fgui.GButton;
	public m_AccountLoginButton:fgui.GButton;
	public m_WechatLoginButton:fgui.GButton;
	public static URL:string = "ui://bo84ikbpc97bn";

	public static createInstance():UI_SceneAuth {
		return <UI_SceneAuth>(fgui.UIPackage.createObject("SceneAuth", "SceneAuth"));
	}

	protected onConstruct():void {
		this.m_RepairButton = <fgui.GButton>(this.getChildAt(3));
		this.m_GuestLoginButton = <fgui.GButton>(this.getChildAt(4));
		this.m_AccountLoginButton = <fgui.GButton>(this.getChildAt(5));
		this.m_WechatLoginButton = <fgui.GButton>(this.getChildAt(6));
	}
}