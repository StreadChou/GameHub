/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_LoadingMain extends fgui.GComponent {

	public m_Loading:fgui.GTextField;
	public static URL:string = "ui://e95hjc3ljrql0";

	public static createInstance():UI_LoadingMain {
		return <UI_LoadingMain>(fgui.UIPackage.createObject("Loading", "LoadingMain"));
	}

	protected onConstruct():void {
		this.m_Loading = <fgui.GTextField>(this.getChildAt(0));
	}
}