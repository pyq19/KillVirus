const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelDesign extends cc.Component {
    @property([cc.Node])
    nodes: Array<cc.Node> = [];
    @property([cc.Node])
    separators: Array<cc.Node> = [];

    anim_speed = 0.1;
    // current_level = 6;
    current_level = 1;

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
        if (this.current_level == 1) {
            this.left1.opacity = 0;
        } else {
            this.left1.opacity = 255;
        }
        this.right1.opacity = 0;
        this.left2.opacity = 0;
        this.left3.opacity = 0;
        this.right3.opacity = 0;

        for (let i = 0; i < this.nodes.length; i++) {
            let script = this.nodes[i].getComponent("level_item");
            script.set_index(i);
            script.set_level(this.current_level - 2 + i);
        }
    }

    previous_level() {
        if (this.current_level == 1) {
            return;
        }
        this.current_level--;
        if (this.current_level == 1) {
            this.left0.active = false;
            this.right0.active = false;
        } else {
            this.left0.active = true;
            this.right0.active = true;
        }

        let t = cc.tween;
        for (let i = 0; i < this.nodes.length; i++) {
            let script = this.nodes[i].getComponent("level_item");
            switch (script.index) {
                case 0:
                    t(this.nodes[i])
                        .by(this.anim_speed, {
                            position: cc.v2(200, 0),
                            opacity: 255,
                        })
                        .call(() => {
                            script.set_index(1);
                        })
                        .start();
                    break;
                case 1:
                    t(this.nodes[i])
                        .parallel(
                            t().by(this.anim_speed, {
                                position: cc.v2(200, 0),
                            }),
                            t().to(this.anim_speed, { scale: 1.6 })
                        )
                        .call(() => {
                            script.set_index(2);
                        })
                        .start();
                    break;
                case 2:
                    t(this.nodes[i])
                        .parallel(
                            t().by(this.anim_speed, {
                                position: cc.v2(200, 0),
                            }),
                            t().to(this.anim_speed, { scale: 1 })
                        )
                        .call(() => {
                            script.set_index(3);
                        })
                        .start();
                    break;
                case 3:
                    t(this.nodes[i])
                        .parallel(
                            t().by(this.anim_speed, {
                                position: cc.v2(200, 0),
                            }),
                            t().to(this.anim_speed, { opacity: 0 })
                        )
                        .call(() => {
                            this.nodes[i].setPosition(cc.v2(-400, 0));
                            script.set_index(0);
                            script.set_level(this.current_level - 2);
                            // t(this.nodes[i])
                            //     .to(this.anim_speed, { opacity: 255 })
                            //     .start();
                        })
                        .start();
                    break;
                case 4:
                    script.set_level(this.current_level + 2);
                    break;
            }
        }
        t(this.left1)
            .by(this.anim_speed, {
                position: cc.v2(240, 0),
                opacity: -255,
            })
            .call(() => {
                t(this.left1)
                    .by(0, { position: cc.v2(-240, 0), opacity: 255 })
                    .start();
                if (this.current_level == 1) {
                    t(this.left1).to(0, { opacity: 0 }).start();
                }
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
        t(this.right2)
            .by(this.anim_speed, {
                position: cc.v2(240, 0),
                opacity: -255,
            })
            .call(() => {
                t(this.right2)
                    .by(0, { position: cc.v2(-240, 0), opacity: 255 })
                    .start();
            })
            .start();
    }

    // 关卡+1(向左滑动)
    next_level() {
        this.current_level++;
        this.left0.active = true;
        this.right0.active = true;
        let t = cc.tween;
        for (let i = 0; i < this.nodes.length; i++) {
            let script = this.nodes[i].getComponent("level_item");
            switch (script.index) {
                case 0:
                    script.set_level(this.current_level - 2);
                    break;
                case 1:
                    t(this.nodes[i])
                        .parallel(
                            t().by(this.anim_speed, {
                                position: cc.v2(-200, 0),
                            }),
                            t().to(this.anim_speed, { opacity: 0 })
                        )
                        .call(() => {
                            this.nodes[i].setPosition(cc.v2(400, 0));
                            script.set_index(4);
                            script.set_level(this.current_level + 2);
                            // t(this.nodes[i])
                            //     .to(this.anim_speed, { opacity: 255 })
                            //     .start();
                        })
                        .start();
                    break;
                case 2:
                    t(this.nodes[i])
                        .parallel(
                            t().by(this.anim_speed, {
                                position: cc.v2(-200, 0),
                            }),
                            t().to(this.anim_speed, { scale: 1 })
                        )
                        .call(() => {
                            script.set_index(1);
                        })
                        .start();
                    break;
                case 3:
                    t(this.nodes[i])
                        .parallel(
                            t().by(this.anim_speed, {
                                position: cc.v2(-200, 0),
                            }),
                            t().to(this.anim_speed, { scale: 1.6 })
                        )
                        .call(() => {
                            script.set_index(2);
                        })
                        .start();
                    break;
                case 4:
                    t(this.nodes[i])
                        .by(this.anim_speed, {
                            position: cc.v2(-200, 0),
                            opacity: 255,
                        })
                        .call(() => {
                            script.set_index(3);
                        })
                        .start();
                    break;
            }
        }
        t(this.left2)
            .by(this.anim_speed, {
                position: cc.v2(-240, 0),
                opacity: 255,
            })
            .call(() => {
                t(this.left2)
                    .by(0, { position: cc.v2(240, 0), opacity: -255 })
                    .start();
            })
            .start();
        t(this.right2)
            .by(this.anim_speed, {
                position: cc.v2(-240, 0),
                opacity: -255,
            })
            .call(() => {
                t(this.right2)
                    .by(0, { position: cc.v2(240, 0), opacity: 255 })
                    .start();
            })
            .start();
        t(this.right3)
            .by(this.anim_speed, { position: cc.v2(-160, 0), opacity: 255 })
            .call(() => {
                t(this.right3)
                    .by(0, { position: cc.v2(160, 0), opacity: -255 })
                    .start();
            })
            .start();
        t(this.left1)
            .by(this.anim_speed, {
                position: cc.v2(-240, 0),
                opacity: -255,
            })
            .call(() => {
                t(this.left1)
                    .by(0, { position: cc.v2(240, 0), opacity: 255 })
                    .start();
            })
            .start();
    }
}
