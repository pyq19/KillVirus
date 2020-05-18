const { ccclass, property } = cc._decorator;

@ccclass
export default class Logo extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;
}
