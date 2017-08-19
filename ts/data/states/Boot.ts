module TProject {

    export class Boot extends Phaser.State {

        preload () {

            _.log("Loading...");

            this.game.load.onFileComplete.add(this.loadingUpdate, this);
            //if (window["baseURL"] != ""){
                this.game.load.baseURL = "./";
            //}
            this.game.load.image("background", "assets/" + "space.jpg");

            this.game.load.script('webfont', 'dist/lib/webfont.js');

            var texture_json = {"frames":
            { "border": {
                "frame": {"x":1,"y":204,"w":91,"h":293},
                "rotated": false,
                "trimmed": true,
                "spriteSourceSize": {"x":7,"y":4,"w":91,"h":293},
                "sourceSize": {"w":101,"h":302}
            },
                "pineapple": {
                    "frame": {"x":1,"y":1,"w":135,"h":201},
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": {"x":0,"y":0,"w":135,"h":201},
                    "sourceSize": {"w":135,"h":201}
                },
                "rect": {
                    "frame": {"x":94,"y":204,"w":88,"h":290},
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": {"x":1,"y":1,"w":88,"h":290},
                    "sourceSize": {"w":90,"h":292}
                }
            }}

            this.game.load.atlasJSONHash('Atlas', "assets/atlas.png", null, texture_json);



        }

        create () {
            
            Core.begin(this.game);

            WebFont.load({
                google: {
                    families: ['Acme']
                }
            });

        }

        private loadingUpdate(progress: number, cacheKey: string, success: boolean, totalLoaded: number, totalFiles: number) {

            if (progress >= 100.0) {
                this.game.load.onFileComplete.removeAll();

                this.game.state.start("Body", true); 
            }
        }

    }
}