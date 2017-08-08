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