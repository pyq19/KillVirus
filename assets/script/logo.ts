const { ccclass, property } = cc._decorator;

@ccclass
export default class Logo extends cc.Component {
    @property([cc.Node])
    nodes: Array<cc.Node> = [];

    onLoad() {
        cc.tween(this.nodes[0])
            .repeat(3, cc.sequence(cc.fadeOut(0.5), cc.fadeIn(0.5)))
            .call(() => {
                cc.tween(this.nodes[1])
                    .to(0.5, { scaleX: 1 })
                    .call(() => {})
                    .start();
            })
            .start();
    }
}
