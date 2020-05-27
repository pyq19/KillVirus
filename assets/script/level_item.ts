const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelItem extends cc.Component {
    index: number = 0;
    level: number;
    set_index(index: number) {
        this.index = index;
    }
    set_level(level: number) {
        this.level = level;
        this.node.getChildByName("boss").active = level % 3 == 0 ? true : false;
        this.node.getChildByName("text").getComponent(cc.Label).string =
            "" + level;
        if (level == 0) {
            this.node.active = false;
        } else {
            this.node.active = true;
        }
    }
}
