const { ccclass, property } = cc._decorator;

// 奖励金币
@ccclass
export default class Award extends cc.Component {
    progress_bar: cc.ProgressBar = null;
    gold: cc.Label = null;
    time: number = 3; // 3 秒一圈

    on_get_gold_click() {
        window["create_golds"](this.node.getPosition());
    }

    onLoad() {
        this.progress_bar = this.node
            .getChildByName("CoinLight")
            .getComponent(cc.ProgressBar);
        this.progress_bar.progress = 0;
        this.gold = this.node.getChildByName("LabCoin").getComponent(cc.Label);
        this.gold.string = "0";

        let award_gold = cc.sys.localStorage.getItem("award_gold");
        if (award_gold == null) {
            award_gold = 0;
        }
        this.gold.string = award_gold + "";
        cc.sys.localStorage.setItem("award_gold", parseInt(this.gold.string));
    }

    update(dt: number) {
        let dis = (1 / this.time) * dt;
        this.progress_bar.progress += dis;
        if (this.progress_bar.progress >= 1) {
            this.progress_bar.progress = 0;
            let num = parseInt(this.gold.string);
            if (num >= 999) {
                this.gold.string = "999";
                return;
            }
            this.gold.string = num + 3 + "";
            cc.sys.localStorage.setItem(
                "award_gold",
                parseInt(this.gold.string)
            );
        }
        // cc.log(cc.sys.localStorage.getItem("award_gold"));
    }
}
