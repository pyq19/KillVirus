const { ccclass, property } = cc._decorator;

// 奖励金币
@ccclass
export default class Award extends cc.Component {
    on_get_gold_click() {
        window["generate_gold"]();
    }

    update(dt: number) {
        // cc.log(dt);
    }
}
