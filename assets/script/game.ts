const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Node)
    top: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;
    @property(cc.Node)
    level_design: cc.Node = null;
    @property(cc.Node)
    setting: cc.Node = null;
    @property(cc.Node)
    get_gold: cc.Node = null;
    @property(cc.Node)
    bottom: cc.Node = null;
    @property(cc.Node)
    tip: cc.Node = null;

    // 移出
    move_out() {
        cc.tween(this.top)
            .to(0.3, { position: cc.v2(0, 1000) })
            .start();
        cc.tween(this.logo)
            .by(0.3, { position: cc.v2(0, 1000) })
            .start();
        cc.tween(this.setting)
            .by(0.3, { position: cc.v2(-200, 0) })
            .start();
        cc.tween(this.level_design)
            .to(0.3, { position: cc.v2(0, 800), scale: 0.4 })
            .start();
        cc.tween(this.get_gold)
            .by(0.3, { position: cc.v2(1000, 0) })
            .start();
        cc.tween(this.bottom)
            .by(0.3, { position: cc.v2(0, -200) })
            .start();
        cc.tween(this.tip).to(0.3, { opacity: 0 }).start();
    }

    // 移入
    move_in() {
        cc.tween(this.top)
            .to(0.3, { position: cc.v2(0, 0) })
            .start();
        cc.tween(this.logo)
            .by(0.3, { position: cc.v2(0, -1000) })
            .start();
        cc.tween(this.setting)
            .by(0.3, { position: cc.v2(200, 0) })
            .start();
        cc.tween(this.level_design)
            .to(0.3, { position: cc.v2(0, 200), scale: 1 })
            .start();
        cc.tween(this.get_gold)
            .by(0.3, { position: cc.v2(-1000, 0) })
            .start();
        cc.tween(this.bottom)
            .by(0.3, { position: cc.v2(0, 200) })
            .start();
        cc.tween(this.tip).to(0.3, { opacity: 255 }).start();
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
