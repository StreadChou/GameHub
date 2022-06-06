/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_CommonWindowFrame extends fgui.GComponent {

	public m_background:fgui.GImage;
	public m_closeButton:fgui.GButton;
	public static URL:string = "ui://bjc65ilgiv7g0";

	public static createInstance():UI_CommonWindowFrame {
		return <UI_CommonWindowFrame>(fgui.UIPackage.createObject("Common", "CommonWindowFrame"));
	}

	protected onConstruct():void {
		this.m_background = <fgui.GImage>(this.getChildAt(0));
		this.m_closeButton = <fgui.GButton>(this.getChildAt(1));
	}
}