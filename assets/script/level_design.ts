const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelDesign extends cc.Component {
    @property([cc.Node])
    nodes: Array<cc.Node> = [];
}
