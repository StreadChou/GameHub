/**
 * 通用的window
 */
export abstract class AbstractWindow<T extends fgui.GComponent> extends fgui.Window {
    showDuration = 0.1; // 展示的时候动画持续时间
    hideDuration = 0.1; // 隐藏的时候动画持续时间

    protected onInit(): void {
        this.center();
        // 弹出窗口的动效已中心为轴心, 动画可以自然一点
        this.setPivot(0.5, 0.5);
    }

    protected doShowAnimation(): void {
        this.setScale(0.1, 0.1);
        fgui.GTween.to2(0.1, 0.1, 1, 1, this.showDuration)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.onShown, this);
    }

    protected doHideAnimation(): void {
        fgui.GTween.to2(1, 1, 0.1, 0.1, this.hideDuration)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.hideImmediately, this);
    }


}