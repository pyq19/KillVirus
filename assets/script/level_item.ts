const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelItem extends cc.Component {
    set_item_level(level: number) {
        this.node.getChildByName("boss").active =
            level % 3 !== 0 ? true : false;
    }
}
