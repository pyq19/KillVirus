const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    gold_pool: cc.NodePool = null;

    @property(cc.Node)
    top: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;
    @property(cc.Node)
    level_design: cc.Node = null;
    @property(cc.Node)
    setting: cc.Node = null;
    @property(cc.Node)
    get_gold: cc.Node = null;
    @property(cc.Node)
    bottom: cc.Node = null;
    @property(cc.Node)
    tip: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    airplane: cc.Node = null;
    @property(cc.Prefab)
    gold_prefab: cc.Prefab = null;

    onLoad() {
        // this.airplane.setPosition(cc.v2(0, -925));
        // this.airplane.setScale(cc.v2(0.8, 0.8));
        // this.airplane.runAction(
        //     cc.sequence(cc.moveTo(1, cc.v2(0, -385)), cc.scaleTo(0.5, 1, 1))
        // );
        this.airplane.setPosition(cc.v2(0, -925));
        this.airplane.setScale(cc.v2(0.8, 0.8));
        let t = cc.tween;
        t(this.airplane)
            .to(1, { position: cc.v2(0, -508) })
            .call(() => {
                t(this.airplane).to(0.5, { scale: 1 }).start();
                t(this.bg).to(0.5, { scale: 1.2 }).start();
            })
            .start();

        // 金币对象池
        this.gold_pool = new cc.NodePool();
        let init_count = 10;
        for (let i = 0; i < init_count; i++) {
            let gold = cc.instantiate(this.gold_prefab);
            this.gold_pool.put(gold);
        }
        window["create_golds"] = this.create_golds.bind(this);
    }

    // 移出
    move_out() {
        cc.tween(this.top)
            .to(0.3, { position: cc.v2(0, 1000) })
            .start();
        cc.tween(this.logo)
            .by(0.3, { position: cc.v2(0, 1000) })
            .start();
        cc.tween(this.setting)
            .by(0.3, { position: cc.v2(-200, 0) })
            .start();
        cc.tween(this.level_design)
            .to(0.3, { position: cc.v2(0, 800), scale: 0.4 })
            .start();
        cc.tween(this.get_gold)
            .by(0.3, { position: cc.v2(1000, 0) })
            .start();
        cc.tween(this.bottom)
            .by(0.3, { position: cc.v2(0, -200) })
            .start();
        cc.tween(this.tip).to(0.3, { opacity: 0 }).start();
        cc.tween(this.bg).to(0.5, { scale: 1 }).start();
    }

    // 移入
    move_in() {
        cc.tween(this.top)
            .to(0.3, { position: cc.v2(0, 0) })
            .start();
        cc.tween(this.logo)
            .by(0.3, { position: cc.v2(0, -1000) })
            .start();
        cc.tween(this.setting)
            .by(0.3, { position: cc.v2(200, 0) })
            .start();
        cc.tween(this.level_design)
            .to(0.3, { position: cc.v2(0, 200), scale: 1 })
            .start();
        cc.tween(this.get_gold)
            .by(0.3, { position: cc.v2(-1000, 0) })
            .start();
        cc.tween(this.bottom)
            .by(0.3, { position: cc.v2(0, 200) })
            .start();
        cc.tween(this.tip).to(0.3, { opacity: 255 }).start();
        cc.tween(this.bg).to(0.5, { scale: 1.2 }).start();
    }

    // 关卡-1(向右滑动)
    previous_level() {
        let script = this.level_design.getComponent("level_design");
        script.previous_level();
    }

    // 关卡+1(向左滑动)
    next_level() {
        let script = this.level_design.getComponent("level_design");
        script.next_level();
    }

    // 创建一个金币
    _create_gold(parent_node: cc.Node): cc.Node {
        let gold: cc.Node = null;
        if (this.gold_pool.size() > 0) {
            gold = this.gold_pool.get();
        } else {
            gold = cc.instantiate(this.gold_prefab);
        }
        gold.parent = parent_node;
        // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
        return gold;
    }

    // TODO 传入中心点、半径、数量，返回以该点为圆心的点的数组
    _get_points(
        center: cc.Vec2,
        radius: number,
        count: number
    ): Array<cc.Vec2> {
        return [cc.v2(-100, -200), cc.v2(-200, -300)];
    }

    // 创建很多的金币, center 是起始点
    create_golds(center: cc.Vec2) {
        let points = this._get_points(center, 10, 8);
        let golds = [];
        for (let i = 0; i < points.length; i++) {
            golds.push(this._create_gold(this.node));
        }
        // 对 points 排序，离目标点 (-468, 885) 近的排前面
        points.sort();
        // 金币飞向目标点
        let t = cc.tween;
        let isScale = false; // top 的金币是否放大
        let top_gold = this.top.getChildByName("Gold");
        for (let i = 0; i < golds.length; i++) {
            let gold = golds[i];
            gold.setPosition(this.get_gold.getPosition());
            t(gold)
                .to(0.2, { position: points[i] })
                .call(() => {
                    t(gold)
                        .to(0.5, { position: cc.v2(-468, 885) })
                        .call(() => {
                            if (!isScale) {
                                t(top_gold)
                                    .to(0, { scale: 1 })
                                    .call(() => {
                                        isScale = true;
                                        t(top_gold)
                                            .to(0, { scale: 0.6 })
                                            .call(() => (isScale = false))
                                            .start();
                                    })
                                    .start();
                            }
                            // 把金币回收到对象池
                            this.gold_pool.put(gold);
                        })
                        .start();
                })
                .start();
        }
    }
}
