/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_SceneHall extends fgui.GComponent {

	public m_NickName:fgui.GTextField;
	public m_LevelValue:fgui.GTextField;
	public m_ButtonSetting:fgui.GButton;
	public m_ButtonEmail:fgui.GButton;
	public m_ButtonMoney:fgui.GButton;
	public m_ButtonGold:fgui.GButton;
	public m_ButtonLogout:fgui.GButton;
	public m_ButtonRunfast:fgui.GButton;
	public m_ButtonChangShaMahJong:fgui.GButton;
	public m_ButtonAnyValueMahJong:fgui.GButton;
	public m_ButtonFightLoard:fgui.GButton;
	public m_ButtonThreeFightOne:fgui.GButton;
	public m_ButtonRoundMahJong:fgui.GButton;
	public m_ButtonMoreGame:fgui.GButton;
	public m_ButtonShop:fgui.GButton;
	public m_ButtonBag:fgui.GButton;
	public m_ButtonTask:fgui.GButton;
	public m_ButtonActivity:fgui.GButton;
	public m_ButtonWelfare:fgui.GButton;
	public m_ButtonMoreAction:fgui.GButton;
	public m_ButtonFastStart:fgui.GButton;
	public m_ButtonJoinRoom:fgui.GButton;
	public static URL:string = "ui://ac9pkdy3ml4v1p";

	public static createInstance():UI_SceneHall {
		return <UI_SceneHall>(fgui.UIPackage.createObject("SceneHall", "SceneHall"));
	}

	protected onConstruct():void {
		this.m_NickName = <fgui.GTextField>(this.getChildAt(4));
		this.m_LevelValue = <fgui.GTextField>(this.getChildAt(6));
		this.m_ButtonSetting = <fgui.GButton>(this.getChildAt(8));
		this.m_ButtonEmail = <fgui.GButton>(this.getChildAt(9));
		this.m_ButtonMoney = <fgui.GButton>(this.getChildAt(10));
		this.m_ButtonGold = <fgui.GButton>(this.getChildAt(11));
		this.m_ButtonLogout = <fgui.GButton>(this.getChildAt(12));
		this.m_ButtonRunfast = <fgui.GButton>(this.getChildAt(13));
		this.m_ButtonChangShaMahJong = <fgui.GButton>(this.getChildAt(14));
		this.m_ButtonAnyValueMahJong = <fgui.GButton>(this.getChildAt(15));
		this.m_ButtonFightLoard = <fgui.GButton>(this.getChildAt(16));
		this.m_ButtonThreeFightOne = <fgui.GButton>(this.getChildAt(17));
		this.m_ButtonRoundMahJong = <fgui.GButton>(this.getChildAt(18));
		this.m_ButtonMoreGame = <fgui.GButton>(this.getChildAt(19));
		this.m_ButtonShop = <fgui.GButton>(this.getChildAt(22));
		this.m_ButtonBag = <fgui.GButton>(this.getChildAt(23));
		this.m_ButtonTask = <fgui.GButton>(this.getChildAt(24));
		this.m_ButtonActivity = <fgui.GButton>(this.getChildAt(25));
		this.m_ButtonWelfare = <fgui.GButton>(this.getChildAt(26));
		this.m_ButtonMoreAction = <fgui.GButton>(this.getChildAt(27));
		this.m_ButtonFastStart = <fgui.GButton>(this.getChildAt(29));
		this.m_ButtonJoinRoom = <fgui.GButton>(this.getChildAt(31));
	}
}