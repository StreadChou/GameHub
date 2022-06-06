/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_UserCover from "./UI_UserCover";
import UI_LeftUserInfo from "./UI_LeftUserInfo";
import UI_TopUserInfo from "./UI_TopUserInfo";

export default class UI_CommonPoker extends fgui.GComponent {

	public m_SelfUserInfo:UI_UserCover;
	public m_LeftUserInfo:UI_LeftUserInfo;
	public m_TopUserInfo:UI_TopUserInfo;
	public m_RightUserInfo:fgui.GComponent;
	public m_RoomInfoBackground:fgui.GGraph;
	public m_RoomIdLabel:fgui.GTextField;
	public m_RoomIdValue:fgui.GTextField;
	public m_PasswordLabel:fgui.GTextField;
	public m_PasswordValue:fgui.GTextField;
	public static URL:string = "ui://b557p5phpvr40";

	public static createInstance():UI_CommonPoker {
		return <UI_CommonPoker>(fgui.UIPackage.createObject("CommonPoker", "CommonPoker"));
	}

	protected onConstruct():void {
		this.m_SelfUserInfo = <UI_UserCover>(this.getChildAt(3));
		this.m_LeftUserInfo = <UI_LeftUserInfo>(this.getChildAt(4));
		this.m_TopUserInfo = <UI_TopUserInfo>(this.getChildAt(5));
		this.m_RightUserInfo = <fgui.GComponent>(this.getChildAt(6));
		this.m_RoomInfoBackground = <fgui.GGraph>(this.getChildAt(7));
		this.m_RoomIdLabel = <fgui.GTextField>(this.getChildAt(8));
		this.m_RoomIdValue = <fgui.GTextField>(this.getChildAt(9));
		this.m_PasswordLabel = <fgui.GTextField>(this.getChildAt(10));
		this.m_PasswordValue = <fgui.GTextField>(this.getChildAt(11));
	}
}