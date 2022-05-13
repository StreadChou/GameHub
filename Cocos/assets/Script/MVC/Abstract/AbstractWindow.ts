export abstract class AbstractWindow<T extends fgui.GComponent> extends fgui.Window {
    abstract _view: T;
}