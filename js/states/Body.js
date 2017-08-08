var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TProject;
(function (TProject) {
    var Body = (function (_super) {
        __extends(Body, _super);
        function Body() {
            _super.call(this, false); // true - и будут отслеживаться повороты
        }
        Body.prototype.create = function () {
            TProject._.log("Start game!");
            this._background = this.game.add.sprite(0, 0, "background");
            this._background.anchor.set(0.5);
            this._background.scale.setTo(2, 2);
            this._scorePlankOSprite = new TProject.OSprite(TProject.Core.defaultWidth, 0);
            this._scorePlank = new TProject.ScorePlank(this.game, 50, 250, 3);
            this._scorePlankOSprite.addChild(this._scorePlank);
            this._ananasOSprite = new TProject.OSprite(this.game.world.centerX, this.game.world.centerY);
            this._ananas = new TProject.BaseAnanas(this.game, 0, 0, this._scorePlank);
            this._ananas.activateAnanas();
            this._ananasOSprite.addChild(this._ananas);
        };
        Body.prototype.update = function () {
        };
        // а это то самое отслеживание поворотов
        Body.prototype.onPortret = function () {
            TProject._.log("Portret");
        };
        Body.prototype.onLandscape = function () {
            TProject._.log("Landscape");
        };
        return Body;
    })(TProject.OState);
    TProject.Body = Body;
})(TProject || (TProject = {}));
