const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Node)
    top: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;
    @property(cc.Node)
    level_design: cc.Node = null;

    // 移出
    move_out() {
        cc.tween(this.top)
            .to(0.3, { position: cc.v2(0, 1000) })
            .start();
        cc.tween(this.logo)
            .to(0.3, { position: cc.v2(0, 1000) })
            .start();
    }

    // 移入
    move_in() {
        cc.tween(this.top)
            .to(0.3, { position: cc.v2(0, 0) })
            .start();
        cc.tween(this.logo)
            .to(0.3, { position: cc.v2(0, 0) })
            .start();
    }

    // 关卡-1(向右滑动)
    previous_level() {
        let t = cc.tween;
        // 所有框框向右移动
        t(this.level_design)
            .to(0.3, {})
            .call(() => {})
            .start();
        // 当前框变小
        // 之前框变大
        // 复原所有框
    }

    // 关卡+1(向左滑动)
    next_level() {
        // 所有框框向左移动
        // 当前框变小
        // 之后框变大
        // 复原所有框
    }
}
