const { ccclass, property } = cc._decorator;

@ccclass
export default class Logo extends cc.Component {
    @property([cc.Node])
    nodes: Array<cc.Node> = [];

    onLoad() {
        let t = cc.tween;
        t(this.nodes[0])
            .repeat(3, cc.sequence(cc.fadeOut(0.2), cc.fadeIn(0.2)))
            .call(() => {
                t().parallel(
                    t(this.nodes[0])
                        .repeatForever(
                            cc.sequence(cc.fadeOut(0.2), cc.fadeIn(0.2))
                        )
                        .start(),
                    t(this.nodes[1])
                        .to(0.2, { scaleX: 1 })
                        .call(() => {
                            t().parallel(
                                t(this.nodes[2])
                                    .to(0.2, {
                                        scale: 1,
                                        position: cc.v2(421, 192),
                                    })
                                    .call(
                                        this.random_move(
                                            this.nodes[2],
                                            cc.v2(421, 192)
                                        )
                                    )
                                    .start(),
                                t(this.nodes[3])
                                    .to(0.2, {
                                        scale: 1,
                                        position: cc.v2(448, -34),
                                    })
                                    .call(
                                        this.random_move(
                                            this.nodes[3],
                                            cc.v2(448, -34)
                                        )
                                    )
                                    .start()
                            );
                        })
                        .start()
                );
            })
            .start();
    }

    random_move(node: cc.Node, center: cc.Vec2) {
        // cc.log(node, center);
        let t = cc.tween;
        let tail = node.getChildByName("tail");
        let circle = node.getChildByName("circle");
        t(tail).to(0, { opacity: 0 }).start();
        t(circle)
            .sequence(cc.fadeOut(0.2), cc.fadeIn(0.2))
            .repeatForever()
            .start();
        this._random_move(node, center);
    }

    _random_move(node: cc.Node, center: cc.Vec2) {
        let x = center.x + this.get_random_int(-50, 50);
        let y = center.y + this.get_random_int(-50, 50);
        let d = this.get_random_float(0.5, 1.0, 1);
        // cc.tween(node)
        //     .to(0.2, { position: cc.v2(x, y) })
        //     .call(this._random_move(node, center))
        //     .start();
        // cc.log(x, y);
        let seq = cc.sequence(
            cc.moveTo(d, cc.v2(x, y)),
            cc.callFunc(() => {
                this._random_move(node, center);
            })
        );
        node.runAction(seq);
    }

    get_random_int(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    get_random_float(min, max, keep) {
        return (Math.random() * (max - min) + min).toFixed(keep);
    }
}
