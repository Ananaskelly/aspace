var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Ananasy on 28.07.2017.
 */
var TProject;
(function (TProject) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(game, x, y) {
            _super.call(this, game, x, y, '');
            this.anchor.set(0.5, 0.5);
            this._ball = this.game.add.sprite(0, 0, 'ball');
            this.addChild(this._ball);
        }
        return Ball;
    })(Phaser.Sprite);
    TProject.Ball = Ball;
})(TProject || (TProject = {}));
