const { ccclass, property } = cc._decorator;

// 奖励金币
@ccclass
export default class Award extends cc.Component {
    progress_bar: cc.ProgressBar = null;
    gold: cc.Label = null;
    time: number = 3; // 3 秒一圈

    on_get_gold_click() {
        let award_gold: number = this.get_award_gold();
        if (award_gold === 0 || award_gold == null) {
            return;
        }
        window["create_golds"](this.node.getPosition());
        let game = this.node.getParent().getComponent("game");
        this.set_award_gold(0);
        let top_gold: number = game.get_top_gold();
        // cc.log(award_gold, " ", top_gold, " ", award_gold + top_gold);
        game.set_top_gold(top_gold + award_gold);
    }

    onLoad() {
        this.progress_bar = this.node
            .getChildByName("CoinLight")
            .getComponent(cc.ProgressBar);
        this.progress_bar.progress = 0;
        this.gold = this.node.getChildByName("LabCoin").getComponent(cc.Label);
        this.gold.string = "0";

        this.gold.string = this.get_award_gold() + "";
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

    // 设置奖励的金币数量
    set_award_gold(num: number) {
        cc.sys.localStorage.setItem("award_gold", 0);
        this.node.getChildByName("LabCoin").getComponent(cc.Label).string = "0";
    }

    get_award_gold(): number {
        let award_gold = cc.sys.localStorage.getItem("award_gold");
        if (award_gold == null) {
            award_gold = 0;
        }
        return parseInt(award_gold);
    }
}
