var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Ananasy on 31.07.2017.
 */
var TProject;
(function (TProject) {
    var AnanasScore = (function (_super) {
        __extends(AnanasScore, _super);
        function AnanasScore(game, x, y) {
            _super.call(this, game, x, y);
            this._bias = -50;
            this._gameScoreText = this.game.add.text(x + this._bias, y + this._bias, '+100', '');
            this._gameScoreText.font = 'Relavia';
            this._gameScoreText.fontSize = 35;
            this._gameScoreText.anchor.set(0.5);
            this._gameScoreText.fill = "#ffffff";
            this.game.stage.addChild(this._gameScoreText);
            this.game.time.events.add(Phaser.Timer.SECOND * 0.1, this.changeIndex, this);
            this._currentTween = this.game.add.tween(this._gameScoreText).to({ y: this._gameScoreText.y - 50 }, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
            this.game.add.tween(this._gameScoreText).to({ alpha: 0 }, 1000, Phaser.Easing.Sinusoidal.Out, true, 100).onComplete.add(this.scoreEnd, this);
        }
        AnanasScore.prototype.changeIndex = function () {
            this.game.stage.setChildIndex(this._gameScoreText, this.game.stage.children.length - 1);
        };
        AnanasScore.prototype.scoreEnd = function () {
            this.game.tweens.remove(this._currentTween);
            this._gameScoreText.destroy();
            this.destroy();
        };
        return AnanasScore;
    })(Phaser.Sprite);
    TProject.AnanasScore = AnanasScore;
})(TProject || (TProject = {}));
