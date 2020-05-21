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
                                    .call(() => {})
                                    .start(),
                                t(this.nodes[3])
                                    .to(0.2, {
                                        scale: 1,
                                        position: cc.v2(448, -34),
                                    })
                                    .call(() => {})
                                    .start()
                            );
                        })
                        .start()
                );
            })
            .start();
    }
}
