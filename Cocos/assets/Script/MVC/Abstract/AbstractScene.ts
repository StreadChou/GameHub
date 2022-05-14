export abstract class AbstractScene extends cc.Component {
    protected abstract _view: any;
    protected abstract loaded: boolean;

    onUILoaded() {
        this.loaded = true;
    }
}