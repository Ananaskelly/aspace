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
    var BaseAnanas = (function (_super) {
        __extends(BaseAnanas, _super);
        function BaseAnanas(game, x, y, scorePlank) {
            _super.call(this, game, x, y, '');
            this.anchor.set(0.5, 0.5);
            this.angle = -90;
            this._scorePlank = scorePlank;
            this.loadTexture("Atlas", "pineapple");
        }
        BaseAnanas.prototype.activateAnanas = function () {
            this.inputEnabled = true;
            this.events.onInputDown.add(this.onInputDown, this);
            this.events.onInputOver.add(this.onInputOver, this);
        };
        BaseAnanas.prototype.onInputDown = function () {
            this.game.add.tween(this).to({ angle: -85 }, 10, Phaser.Easing.Linear.None, true, 0, 1, true);
            this._ananasScore = new TProject.AnanasScore(this.game, this.world.x, this.world.y);
            this._scorePlank.scoreUp();
        };
        BaseAnanas.prototype.onInputOver = function () {
            this.game.add.tween(this.scale).to({ x: 1.2, y: 1.2 }, 400, Phaser.Easing.Back.Out, true, 0, 0, true);
        };
        return BaseAnanas;
    })(Phaser.Sprite);
    TProject.BaseAnanas = BaseAnanas;
})(TProject || (TProject = {}));
