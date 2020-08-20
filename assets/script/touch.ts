import Game from "./game";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Touch extends cc.Component {
    bg: cc.Node = null;
    game: Game = null;

    is_playing: boolean = false; // 玩家是否在玩的状态
    is_movable: boolean = false; // 飞机是否可以通过触摸移动

    onLoad() {
        this.game = this.node.getParent().getComponent("game");
        this.bg = this.node.getChildByName("bg");
        this.bg.opacity = 0;
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
        // cc.log("on touch start");
        cc.tween(this.bg).to(0.5, { opacity: 0 }).start(); // 点击时候 bg 淡出
        if (this.is_playing) {
            this.game.airplane_start_fire();
            return;
        }
        this.is_playing = true;
        this.game.move_out();
        this.scheduleOnce(() => {
            this.is_movable = true;
            this.game.airplane_start_fire();
        }, 0.1); // 0.5秒后 只执行一次
    }

    on_touch_move(event: cc.Event.EventTouch, target: cc.Node) {
        if (!this.is_movable) {
            return;
        }
        // cc.log("on_touch_move");
        this.game.update_airplane_position(event.getDelta());
    }

    on_touch_end() {
        // cc.log("on_touch_end");
        cc.tween(this.bg).to(0.5, { opacity: 255 }).start(); // 抬起时候 bg 淡入
        this.game.airplane_stop_fire();
    }
}
