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
        let script = this.level_design.getComponent("level_design");
        script.previous_level();
    }

    // 关卡+1(向左滑动)
    next_level() {
        let script = this.level_design.getComponent("level_design");
        script.next_level();
    }
}
