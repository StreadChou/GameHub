import Hall from "../Hall/Hall";

export abstract class AbstractGameMain extends cc.Component {

    // 退出房间, 销毁当前组件, 然后加载大厅
    onLeaveRoom() {
        this.addComponent(Hall);
        this.node.removeComponent(this);
        this.destroy();
    }
}