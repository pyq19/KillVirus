const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelDesign extends cc.Component {
    @property([cc.Node])
    nodes: Array<cc.Node> = [];
    @property([cc.Node])
    separators: Array<cc.Node> = [];

    anim_speed = 0.2;
    current_level = 0;

    left0: cc.Node = null;
    right0: cc.Node = null;
    left1: cc.Node = null;
    right1: cc.Node = null;
    left2: cc.Node = null;
    right2: cc.Node = null;
    left3: cc.Node = null;
    right3: cc.Node = null;

    onLoad() {
        this.left0 = this.separators[0].getChildByName("left");
        this.right0 = this.separators[0].getChildByName("right");
        this.left1 = this.separators[1].getChildByName("left");
        this.right1 = this.separators[1].getChildByName("right");
        this.left2 = this.separators[2].getChildByName("left");
        this.right2 = this.separators[2].getChildByName("right");
        this.left3 = this.separators[3].getChildByName("left");
        this.right3 = this.separators[3].getChildByName("right");
        this.nodes[0].opacity = 0;
        this.nodes[4].opacity = 0;
        this.nodes[2].scale = 1.6;
        this.left0.opacity = 0;
        this.right0.opacity = 0;
        this.right1.opacity = 0;
        this.left2.opacity = 0;
        this.left3.opacity = 0;
        this.right3.opacity = 0;

        this.set_current_level(5);
    }

    set_current_level(level: number) {
        this.current_level = level;
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i]
                .getComponent("level_item")
                .set_item_level(level - 2 + i);
        }
    }

    // 关卡-1(向右滑动)
    previous_level() {
        cc.log(this.current_level);
        if (this.current_level <= 1) {
            return;
        }
        let t = cc.tween;
        t(this.nodes[0])
            .by(this.anim_speed, { position: cc.v2(200, 0), opacity: 255 })
            .call(() => {
                t(this.nodes[0])
                    .parallel(
                        t().by(0, { position: cc.v2(-200, 0) }),
                        t().to(0, { opacity: 0 })
                    )
                    .start();
                // FIXME 动画实现得有问题
                // 换种思路：把 node 做成预制体?
                this.set_current_level(this.current_level - 1);
            })
            .start();
        t(this.nodes[1])
            .parallel(
                t().by(this.anim_speed, { position: cc.v2(200, 0) }),
                t().to(this.anim_speed, { scale: 1.6 })
            )
            .call(() => {
                t(this.nodes[1])
                    .by(0, { position: cc.v2(-200, 0) })
                    .to(0, { scale: 1 })
                    .start();
            })
            .start();
        t(this.nodes[2])
            .parallel(
                t().by(this.anim_speed, { position: cc.v2(200, 0) }),
                t().to(this.anim_speed, { scale: 1 })
            )
            .call(() => {
                t(this.nodes[2])
                    .by(0, { position: cc.v2(-200, 0) })
                    .to(0, { scale: 1.6 })
                    .start();
            })
            .start();
        t(this.nodes[3])
            .parallel(
                t().by(this.anim_speed, { position: cc.v2(200, 0) }),
                t().to(this.anim_speed, { opacity: 0 })
            )
            .call(() => {
                t(this.nodes[3])
                    .by(0, { position: cc.v2(-200, 0) })
                    .to(0, { opacity: 255 })
                    .start();
            })
            .start();
        t(this.left1)
            .by(this.anim_speed, {
                position: cc.v2(240, 0),
                opacity: -255,
            })
            .call(() => {
                t(this.left1)
                    .by(0, { position: cc.v2(-240, 0), opacity: 255 })
                    .start();
            })
            .start();
        t(this.right1)
            .by(this.anim_speed, {
                position: cc.v2(240, 0),
                opacity: 255,
            })
            .call(() => {
                t(this.right1)
                    .by(0, { position: cc.v2(-240, 0), opacity: -255 })
                    .start();
            })
            .start();
        t(this.left0)
            .by(this.anim_speed, { position: cc.v2(160, 0), opacity: 255 })
            .call(() => {
                t(this.left0)
                    .by(0, { position: cc.v2(-160, 0), opacity: -255 })
                    .start();
            })
            .start();
    }

    // 关卡+1(向左滑动)
    next_level() {}
}
