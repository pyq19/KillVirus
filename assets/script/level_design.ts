const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelDesign extends cc.Component {
    @property([cc.Node])
    nodes: Array<cc.Node> = [];

    anim_speed: number = 0.1;

    onLoad() {
        this.nodes[0].opacity = 0;
        this.nodes[4].opacity = 0;
        this.nodes[2].scale = 1.6;
    }

    // 关卡-1(向右滑动)
    previous_level() {
        let t = cc.tween;
        t(this.nodes[0])
            .by(this.anim_speed, { position: cc.v2(133, 0), opacity: 255 })
            .call(() => {
                t(this.nodes[0])
                    .parallel(
                        t().by(0, { position: cc.v2(-133, 0) }),
                        t().to(0, { opacity: 0 })
                    )
                    .start();
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
                t().to(this.anim_speed, { scale: 0.6 })
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
                t().by(this.anim_speed, { position: cc.v2(133, 0) }),
                t().to(this.anim_speed, { opacity: 0 })
            )
            .call(() => {
                t(this.nodes[3])
                    .by(0, { position: cc.v2(-133, 0) })
                    .to(0, { opacity: 255 })
                    .start();
            })
            .start();
    }

    // 关卡+1(向左滑动)
    next_level() {}
}
