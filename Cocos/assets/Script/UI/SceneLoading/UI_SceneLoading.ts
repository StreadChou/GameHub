/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_SceneLoading extends fgui.GComponent {

	public m_LoadingBar:fgui.GSlider;
	public static URL:string = "ui://e95hjc3lilxz7";

	public static createInstance():UI_SceneLoading {
		return <UI_SceneLoading>(fgui.UIPackage.createObject("SceneLoading", "SceneLoading"));
	}

	protected onConstruct():void {
		this.m_LoadingBar = <fgui.GSlider>(this.getChildAt(1));
	}
}