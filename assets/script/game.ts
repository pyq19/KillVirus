const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    airplane_gun: cc.Node = null;
    gold_pool: cc.NodePool = null;
    bullet_pool: cc.NodePool = null;

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
    @property(cc.Prefab)
    bullet_prefab: cc.Prefab = null;

    private bullet_count: number = 1;

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
        let gold_object_count = 10;
        for (let i = 0; i < gold_object_count; i++) {
            let gold = cc.instantiate(this.gold_prefab);
            this.gold_pool.put(gold);
        }
        window["create_golds"] = this.create_golds.bind(this);

        // 子弹对象池
        this.bullet_pool = new cc.NodePool();
        let bullet_object_count = 10;
        for (let i = 0; i < bullet_object_count; i++) {
            let bullet = cc.instantiate(this.bullet_prefab);
            this.bullet_pool.put(bullet);
        }

        // 飞机武器隐藏
        this.airplane_gun = this.airplane.getChildByName("Gun");
        cc.tween(this.airplane_gun)
            .repeatForever(cc.sequence(cc.scaleTo(0.1, 1), cc.scaleTo(0.1, 0)))
            .start();
        this.airplane_gun.active = false;
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
        cc.tween(this.airplane).to(0.5, { scale: 0.8 }).start();
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
        cc.tween(this.airplane).to(0.5, { scale: 1 }).start();
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

    _random(lower: number, upper: number) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }

    // 传入中心点、半径、数量，返回以该点为圆心的点的数组
    _get_points(
        center: cc.Vec2,
        radius: number,
        count: number
    ): Array<cc.Vec2> {
        let points = [];
        let ox = center.x;
        let oy = center.y;
        let r = radius;
        var radians = (Math.PI / 180) * Math.round(360 / count); //弧度
        for (let i = 0; i < count; i++) {
            var x = ox + r * Math.sin(radians * i) + this._random(-30, 30);
            let y = oy + r * Math.cos(radians * i) + this._random(-30, 30);
            // points.unshift({ x: x, y: y }); //为保持数据顺时针
            points.push(cc.v2(x, y));
        }
        return points;
    }

    // 创建很多的金币, center 是起始点
    create_golds(center: cc.Vec2) {
        let points = this._get_points(center, 160, 15);
        // 对 points 排序，离目标点 (-468, 885) 近的排前面
        points.sort(function (a: cc.Vec2, b: cc.Vec2) {
            let d = cc.v2(-468, 885);
            let ax = a.x - d.x;
            let ay = a.y - d.y;
            let ad = Math.sqrt(ax * ax + ay * ay);
            let bx = b.x - d.x;
            let by = b.y - d.y;
            let bd = Math.sqrt(bx * bx + by * by);
            return ad - bd;
        });
        let golds = [];
        for (let i = 0; i < points.length; i++) {
            golds.push(this._create_gold(this.node));
        }
        //
        // 金币飞向目标点, 从离目标点最近的开始飞
        let t = cc.tween;
        let isScale = false; // top 的金币是否放大
        let top_gold = this.top.getChildByName("Gold");
        for (let i = 0; i < golds.length; i++) {
            let gold = golds[i];
            gold.setPosition(this.get_gold.getPosition());
            t(gold)
                .to(0.2, { position: points[i] })
                .delay(0.03 * i)
                .call(() => {
                    t(gold)
                        .to(0.25, { position: cc.v2(-468, 885) })
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

    // 重置数据 比如金币
    reset_data() {
        let award = this.get_gold.getComponent("award");
        award.set_award_gold(0);
        this.top.getChildByName("LabGold").getComponent(cc.Label).string = "0";
        this.set_top_gold(0);
    }

    // 获取 top 金币
    get_top_gold(): number {
        let top_gold = cc.sys.localStorage.getItem("top_gold");
        if (top_gold == null) {
            top_gold = 0;
        }
        return parseInt(top_gold);
    }

    // 设置top金币
    set_top_gold(num: number) {
        // cc.log("set top gold ", num);
        cc.sys.localStorage.setItem("top_gold", num);
        this.top.getChildByName("LabGold").getComponent(cc.Label).string =
            num + "";
    }

    // 移动飞机
    update_airplane_position(delta: cc.Vec2) {
        let current_position = this.airplane.getPosition();
        this.airplane.setPosition(
            cc.v2(current_position.x + delta.x, current_position.y + delta.y)
        );
    }

    // 飞机发射子弹
    airplane_start_fire() {
        cc.log("airplane_start_fire");
        if (this.airplane_gun.active === false) {
            this.airplane_gun.active = true;
        }
        this.schedule(this.create_bullet, 0.1);
    }

    // 飞机停止发射子弹
    airplane_stop_fire() {
        cc.log("airplane_stop_fire");
        this.airplane_gun.active = false;
        this.unschedule(this.create_bullet);
    }

    // 创建一个子弹
    create_bullet() {
        let count = this.bullet_count;
        cc.log("create_bullet count:", count);
        let offsetX = 0;
        for (let i = 0; i < count; i++) {
            if (count === 1) {
                offsetX = 0;
            } else {
                if (count % 2 === 0) {
                    // 偶数个子弹
                    if (i % 2 === 0) {
                        offsetX = (i + 1) * 15;
                    } else {
                        offsetX = -i * 15;
                    }
                } else {
                    // 奇数个子弹
                    if (i === 0) {
                        offsetX = 0;
                    } else if (i % 2 === 0) {
                        offsetX = i * 15;
                    } else {
                        offsetX = (-i - 1) * 15;
                    }
                }
            }
            let bullet: cc.Node = null;
            if (this.bullet_pool.size() > 0) {
                bullet = this.bullet_pool.get();
            } else {
                bullet = cc.instantiate(this.bullet_prefab);
            }
            bullet.parent = this.node;
            bullet.y = this.airplane.position.y + 150;
            bullet.x = this.airplane.position.x + offsetX;
        }
    }

    // 把一个子弹node放入对象池
    delete_bullet(bullet: cc.Node) {
        // cc.log("delete bullet");
        this.bullet_pool.put(bullet);
    }
}
