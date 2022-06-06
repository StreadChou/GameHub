/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_UserCover from "./UI_UserCover";

export default class UI_TopUserInfo extends fgui.GComponent {

	public m_TopUserInfo:UI_UserCover;
	public static URL:string = "ui://b557p5phpvr4f";

	public static createInstance():UI_TopUserInfo {
		return <UI_TopUserInfo>(fgui.UIPackage.createObject("CommonPoker", "TopUserInfo"));
	}

	protected onConstruct():void {
		this.m_TopUserInfo = <UI_UserCover>(this.getChildAt(0));
	}
}