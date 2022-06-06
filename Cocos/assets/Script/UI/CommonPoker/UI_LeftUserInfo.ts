/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_UserCover from "./UI_UserCover";

export default class UI_LeftUserInfo extends fgui.GComponent {

	public m_LeftUserInfo:UI_UserCover;
	public static URL:string = "ui://b557p5phpvr4h";

	public static createInstance():UI_LeftUserInfo {
		return <UI_LeftUserInfo>(fgui.UIPackage.createObject("CommonPoker", "LeftUserInfo"));
	}

	protected onConstruct():void {
		this.m_LeftUserInfo = <UI_UserCover>(this.getChildAt(0));
	}
}