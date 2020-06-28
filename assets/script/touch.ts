const { ccclass, property } = cc._decorator;

@ccclass
export default class Touch extends cc.Component {
    bg: cc.Node = null;

    onLoad() {
        this.bg = this.node.getChildByName("bg");
        this.node.on(
            cc.Node.EventType.TOUCH_START,
            this.on_touch_start.bind(this),
            this
        );
        this.node.on(
            cc.Node.EventType.TOUCH_MOVE,
            this.on_touch_move.bind(this),
            this
        );
        this.node.on(
            cc.Node.EventType.TOUCH_END,
            this.on_touch_end.bind(this),
            this
        );
    }

    on_touch_start() {
        cc.log("on_touch_start");
    }

    on_touch_move() {
        cc.log("on_touch_move");
    }

    on_touch_end() {
        cc.log("on_touch_end");
    }
}
