const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelItem extends cc.Component {
    item_index: number = 0;
    set_item_index(index: number) {
        this.item_index = index;
    }
    set_item_level(level: number) {
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
