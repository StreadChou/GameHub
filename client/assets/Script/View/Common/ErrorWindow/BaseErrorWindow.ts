export abstract class BaseErrorWindow extends fgui.Window {
    abstract WindowName: string;

    protected onInit(): void {
        this.center();

        // 弹出窗口的动效已中心为轴心
        this.setPivot(0.5, 0.5);
    }


    protected doShowAnimation(): void {
        this.setScale(0.1, 0.1);
        fgui.GTween.to2(0.1, 0.1, 1, 1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.onShown, this);
    }

    protected doHideAnimation(): void {
        fgui.GTween.to2(1, 1, 0.1, 0.1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.hideImmediately, this);
    }
}