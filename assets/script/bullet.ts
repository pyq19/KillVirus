import Game from "./game";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    game: Game = null;

    onLoad() {
        this.game = this.node.getParent().getComponent("game");
    }

    update(dt: number) {
        this.node.y += 50;
        if (this.node.y >= 1000) {
            this.game.delete_bullet(this.node);
        }
    }
}
