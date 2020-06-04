const { ccclass, property } = cc._decorator;

@ccclass
export default class Tip extends cc.Component {
    onLoad() {
        // var jumpUp = cc
        //     .moveBy(0.3, jumpDuration, cc.v2(0, this.jumpHeight))
        //     .easing(cc.easeCubicActionOut());
        // // 下落
        // var jumpDown = cc
        //     .moveBy(0.3, cc.v2(0, -this.jumpHeight))
        //     .easing(cc.easeCubicActionIn());
        // // 不断重复
        // return cc.repeatForever(cc.sequence(jumpUp, jumpDown));

        this.node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.rotateTo(0.2, 15).easing(cc.easeCubicActionOut()),
                    cc.rotateTo(0.4, -15).easing(cc.easeCubicActionOut()),
                    cc.rotateTo(0.4, 15).easing(cc.easeCubicActionOut()),
                    cc.rotateTo(0.4, -15).easing(cc.easeCubicActionOut()),
                    cc.rotateTo(0.4, 15).easing(cc.easeCubicActionOut()),
                    cc.rotateTo(0.2, 0).easing(cc.easeCubicActionOut()),
                    cc.delayTime(2)
                )
            )
        );
    }
}
