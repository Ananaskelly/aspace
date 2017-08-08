var TProject;
(function (TProject) {
    var _ = (function () {
        function _() {
        }
        _.randomInt = function (min, max) {
            return Math.floor((max - min + 0.1) * Math.random()) + min;
        };
        _.log = console.log;
        return _;
    })();
    TProject._ = _;
})(TProject || (TProject = {}));

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

/**
 * Created by Ananasy on 30.07.2017.
 */
var TProject;
(function (TProject) {
    var MiddleManager = (function () {
        function MiddleManager() {
        }
        return MiddleManager;
    })();
    TProject.MiddleManager = MiddleManager;
})(TProject || (TProject = {}));

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
    var ScorePlank = (function (_super) {
        __extends(ScorePlank, _super);
        function ScorePlank(game, x, y, upValue) {
            _super.call(this, game, x, y);
            // this.anchor.set(0.5,0.5);
            this._scoreValue = 0;
            this._scopeStepSize = upValue;
            this._scoreText = this.game.add.text(-200, -220, '' + this._scoreValue, '');
            this._scoreText.font = 'Relavia';
            this._scoreText.fontSize = 30;
            //this._scoreText.anchor.set(0.5, 0.5);
            this._scoreText.fill = "#ffffff";
            this.addChild(this._scoreText);
            this._plankFrame = this.game.add.sprite(0, 0, 'Atlas', 'border');
            this._plankFrame.anchor.set(0.5, 0.5);
            this._plankField = this.game.add.sprite(1.5, 1.5, 'Atlas', 'field');
            this._plankField.anchor.set(0.5, 0.5);
            /*this._mask = this.game.add.graphics(this._plankBase.width * 0.5, this._plankBase.height * 0.5);
            this._mask.lineStyle(2, 0xFFA500, 1);
            this._mask.beginFill(0xFFA500);
            this._mask.drawRect(1, 1, this._plankBase.width - 2, this._plankBase.height - 2);
            this._mask.endFill();

            this._plankBase.mask = this._mask;*/
            this.addChild(this._plankFrame);
            this.addChild(this._plankField);
        }
        ScorePlank.prototype.scoreUp = function () {
            this._scoreValue += 100;
            this._scoreText.setText('' + this._scoreValue);
        };
        return ScorePlank;
    })(Phaser.Sprite);
    TProject.ScorePlank = ScorePlank;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Config = (function () {
        function Config() {
        }
        Config.isLandscape = function () {
            return this.height < this.width;
        };
        Config.isDefaultLandscape = function () {
            return this.defaultHeight < this.defaultWidth;
        };
        Config.changeScale = function (game) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            var dw = this.width;
            var dh = this.height;
            if (this.isLandscape() != this.isDefaultLandscape()) {
                dw = this.height;
                dh = this.width;
            }
            this.scale = Math.min(dw / this.defaultWidth, dh / this.defaultHeight);
            this.maxScale = Math.max(dw / this.defaultWidth, dh / this.defaultHeight) / this.scale;
            //console.log("scale", this.scale, this.isLandscape() != game.scale.isLandscape, this.isLandscape() , game.scale.isLandscape)
            this.width /= this.scale;
            this.height /= this.scale;
            game.scale.setUserScale(this.scale, this.scale, 0, 0);
            game.scale.setGameSize(this.width, this.height);
            game.world.setBounds(0, 0, this.width, this.height);
            game.scale.refresh();
        };
        Object.defineProperty(Config, "halfWidth", {
            get: function () {
                return Config.width * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config, "halfHeight", {
            get: function () {
                return Config.height * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config, "hw", {
            get: function () {
                return Config.defaultWidth * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config, "hh", {
            get: function () {
                return Config.defaultHeight * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Config.defaultWidth = 1136;
        Config.defaultHeight = 640;
        Config.scale = 1;
        Config.maxScale = 1;
        return Config;
    })();
    TProject.Config = Config;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Main = (function () {
        function Main() {
            TProject.Core.init(TProject.Config.defaultWidth, TProject.Config.defaultHeight);
            this.game = new Phaser.Game(TProject.Core.defaultWidth, TProject.Core.defaultHeight, Phaser.AUTO, "banner", null, false);
            this.game.state.add("Boot", TProject.Boot, true);
            this.game.state.add("Body", TProject.Body);
        }
        return Main;
    })();
    TProject.Main = Main;
})(TProject || (TProject = {}));
window.onload = function () {
    var game = new TProject.Main();
    setTimeout("window.scrollTo(0, 1)", 10);
};

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

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TProject;
(function (TProject) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            TProject._.log("Loading...");
            this.game.load.onFileComplete.add(this.loadingUpdate, this);
            //if (window["baseURL"] != ""){
            this.game.load.baseURL = "./";
            //}
            this.game.load.image("background", "assets/" + "space.jpg");
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            var texture_json = { "frames": {
                    "border": {
                        "frame": { "x": 1, "y": 138, "w": 91, "h": 293 },
                        "rotated": false,
                        "trimmed": true,
                        "spriteSourceSize": { "x": 7, "y": 124, "w": 91, "h": 293 },
                        "sourceSize": { "w": 526, "h": 600 },
                        "pivot": { "x": 0.5, "y": 0.5 }
                    },
                    "field": {
                        "frame": { "x": 94, "y": 138, "w": 88, "h": 290 },
                        "rotated": false,
                        "trimmed": true,
                        "spriteSourceSize": { "x": 180, "y": 126, "w": 88, "h": 290 },
                        "sourceSize": { "w": 277, "h": 600 },
                        "pivot": { "x": 0.5, "y": 0.5 }
                    },
                    "pineapple": {
                        "filename": "pineapple.png",
                        "frame": { "x": 1, "y": 1, "w": 201, "h": 135 },
                        "rotated": false,
                        "trimmed": false,
                        "spriteSourceSize": { "x": 0, "y": 0, "w": 135, "h": 201 },
                        "sourceSize": { "w": 135, "h": 201 },
                        "pivot": { "x": 0.5, "y": 0.5 }
                    } } };
            var texture_json_2 = { "frames": {
                    "rect": {
                        "frame": { "x": 1, "y": 1, "w": 88, "h": 290 },
                        "rotated": false,
                        "trimmed": true,
                        "spriteSourceSize": { "x": 180, "y": 126, "w": 88, "h": 290 },
                        "sourceSize": { "w": 277, "h": 600 },
                        "pivot": { "x": 0.5, "y": 0.5 }
                    } }
            };
            this.game.load.atlasJSONHash('Atlas', "assets/texture.png", null, texture_json);
            this.game.load.atlasJSONHash('Atlas2', "assets/texture_2.png", null, texture_json_2);
        };
        Boot.prototype.create = function () {
            TProject.Core.begin(this.game);
        };
        Boot.prototype.loadingUpdate = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            if (progress >= 100.0) {
                this.game.load.onFileComplete.removeAll();
                this.game.state.start("Body", true);
            }
        };
        return Boot;
    })(Phaser.State);
    TProject.Boot = Boot;
})(TProject || (TProject = {}));
