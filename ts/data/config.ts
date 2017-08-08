module TProject {

    export class Config {

        static defaultWidth: number = 1136;
        static defaultHeight: number = 640;

        static width: number;
        static height: number;

        static scale: number = 1;
        static maxScale: number = 1;

        static globalEvents: OEventDispatcher;

        static isLandscape():boolean {
            return this.height < this.width;
        }

        static isDefaultLandscape():boolean {
            return this.defaultHeight < this.defaultWidth;
        }

        static changeScale(game: Phaser.Game) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            let dw: number = this.width;
            let dh: number = this.height;

            if (this.isLandscape() != this.isDefaultLandscape()){
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
            
        }

        static get halfWidth():number{
            return Config.width * 0.5;
        }

        static get halfHeight():number{
            return Config.height * 0.5;
        }

        static get hw():number{
            return Config.defaultWidth * 0.5;
        }

        static get hh():number{
            return Config.defaultHeight * 0.5;
        }

    }

}