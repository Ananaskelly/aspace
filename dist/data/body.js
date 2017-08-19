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
        function BaseAnanas(game, x, y, manager, arcade) {
            _super.call(this, game, x, y, '');
            this.anchor.set(0.5, 0.5);
            this._manager = manager;
            this._arcade = arcade;
            this.loadTexture("Atlas", "pineapple");
            this._arcadeSpriteWarp = new Phaser.Physics.Arcade.Body(this);
            this.body = this._arcadeSpriteWarp;
            this.body.velocity = new Phaser.Point(0, 0);
        }
        BaseAnanas.prototype.activateAnanas = function () {
            this.inputEnabled = true;
            this.events.onInputDown.add(this.onInputDown, this);
            this.events.onInputOver.add(this.onInputOver, this);
        };
        BaseAnanas.prototype.onClickHandle = function () {
            this.game.add.tween(this).to({ angle: 5 }, 10, Phaser.Easing.Linear.None, true, 0, 1, true);
            this._ananasScore = new TProject.AnanasScore(this.game, this.world.x, this.world.y);
        };
        BaseAnanas.prototype.pullAnanas = function () {
            this.game.add.tween(this.scale).to({ x: 0.7, y: 0.7 }, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
            this.body.velocity = new Phaser.Point(0, -800);
            this._arcadeSpriteWarp.acceleration.y = -1000;
            this._arcade.accelerateToXY(this, this.x, 0);
            this._timer = new Phaser.Timer(this.game, true);
            this._timer.add((this.body.y / this.body.velocity) * -1000, this.destroyAnanas, this);
            this._timer.start();
        };
        BaseAnanas.prototype.onInputDown = function () {
            this._manager.handleClick();
        };
        BaseAnanas.prototype.onInputOver = function () {
            this.game.add.tween(this.scale).to({ x: 1.2, y: 1.2 }, 400, Phaser.Easing.Back.Out, true, 0, 0, true);
        };
        BaseAnanas.prototype.destroyAnanas = function () {
            this._arcadeSpriteWarp.destroy();
            this.destroy();
            TProject._.log("destroy");
        };
        return BaseAnanas;
    })(Phaser.Sprite);
    TProject.BaseAnanas = BaseAnanas;
})(TProject || (TProject = {}));

/**
 * Created by Ananasy on 17.08.2017.
 */
var TProject;
(function (TProject) {
    var MiddleManager = (function () {
        function MiddleManager() {
        }
        MiddleManager.prototype.initialize = function (ananas, scorePlank, maxRate) {
            this._ananas = ananas;
            this._scorePlank = scorePlank;
            this._maxRate = maxRate;
        };
        MiddleManager.prototype.handleClick = function () {
            if (this._scorePlank.getCurrentScore() < this._maxRate) {
                this._ananas.onClickHandle();
                this._scorePlank.scoreUp();
            }
            else {
                this._ananas.pullAnanas();
            }
        };
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
            this.anchor.set(0.5, 0.5);
            this._scoreValue = 0;
            this._scopeStepSize = upValue;
            this._scoreText = this.game.add.text(0, 0, '' + this._scoreValue, { font: '40px Acme' });
            this._scoreText.anchor.set(0.5, 0.5);
            this._scoreText.fill = "#ffffff";
            this.addChild(this._scoreText);
        }
        ScorePlank.prototype.scoreUp = function () {
            var _this = this;
            this._scoreValue += 100;
            this.game.add.tween(this._scoreText.scale).to({ x: 1.2, y: 1.2 }, 200, Phaser.Easing.Back.Out, true, 0, 0, true).onComplete.add(function () { _this._scoreText.setText('' + _this._scoreValue); }, this._scoreText);
        };
        ScorePlank.prototype.getCurrentScore = function () {
            return this._scoreValue;
        };
        return ScorePlank;
    })(Phaser.Sprite);
    TProject.ScorePlank = ScorePlank;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Ananasy on 17.08.2017.
 */
var TProject;
(function (TProject) {
    var TextBanner = (function (_super) {
        __extends(TextBanner, _super);
        function TextBanner(game, x, y, bound) {
            _super.call(this, game, x, y);
            this._bound = bound;
            this.anchor.set(0.5, 0.5);
            this._textBanner = this.game.add.text(0, 0, "Get " + this._bound + " points and pull pineapple!", { font: '35px Acme' });
            this._textBanner.anchor.set(0.5, 0.5);
            this._textBanner.fill = "#ffffff";
            this.addChild(this._textBanner);
        }
        return TextBanner;
    })(Phaser.Sprite);
    TProject.TextBanner = TextBanner;
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
            //this._background.anchor.set(0.5);
            //this._background.scale.setTo(2, 2);
            this._arcade = new Phaser.Physics.Arcade(this.game);
            this._manager = new TProject.MiddleManager();
            this._headerOSprite = new TProject.OSprite(TProject.Config.hw, 50);
            this._header = new TProject.TextBanner(this.game, 0, 0, 1000);
            this._headerOSprite.addChild(this._header);
            this._scorePlankOSprite = new TProject.OSprite(1000, 0);
            this._scorePlank = new TProject.ScorePlank(this.game, 70, 200, 3);
            this._scorePlankOSprite.addChild(this._scorePlank);
            this._ananasOSprite = new TProject.OSprite(TProject.Config.hw, TProject.Config.hh);
            this._ananas = new TProject.BaseAnanas(this.game, 0, 0, this._manager, this._arcade);
            this._ananas.activateAnanas();
            this._ananasOSprite.addChild(this._ananas);
            this._manager.initialize(this._ananas, this._scorePlank, 1000);
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
            this.game.load.script('webfont', 'dist/lib/webfont.js');
            var texture_json = { "frames": { "border": {
                        "frame": { "x": 1, "y": 204, "w": 91, "h": 293 },
                        "rotated": false,
                        "trimmed": true,
                        "spriteSourceSize": { "x": 7, "y": 4, "w": 91, "h": 293 },
                        "sourceSize": { "w": 101, "h": 302 }
                    },
                    "pineapple": {
                        "frame": { "x": 1, "y": 1, "w": 135, "h": 201 },
                        "rotated": false,
                        "trimmed": false,
                        "spriteSourceSize": { "x": 0, "y": 0, "w": 135, "h": 201 },
                        "sourceSize": { "w": 135, "h": 201 }
                    },
                    "rect": {
                        "frame": { "x": 94, "y": 204, "w": 88, "h": 290 },
                        "rotated": false,
                        "trimmed": true,
                        "spriteSourceSize": { "x": 1, "y": 1, "w": 88, "h": 290 },
                        "sourceSize": { "w": 90, "h": 292 }
                    }
                } };
            this.game.load.atlasJSONHash('Atlas', "assets/atlas.png", null, texture_json);
        };
        Boot.prototype.create = function () {
            TProject.Core.begin(this.game);
            WebFont.load({
                google: {
                    families: ['Acme']
                }
            });
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
