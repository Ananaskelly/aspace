/**
 * Created by Ananasy on 17.08.2017.
 */
module TProject {
    export class TextBanner extends Phaser.Sprite {

        private _textBanner: Phaser.Text;
        private _bound: Number;

        constructor (game: Phaser.Game, x: number, y: number, bound: number){
            super(game, x, y);

            this._bound = bound;

            this.anchor.set(0.5, 0.5);

            this._textBanner = this.game.add.text(0, 0, "Get " + this._bound + " points and pull pineapple!", {font: '35px Acme'});
            this._textBanner.anchor.set(0.5, 0.5);
            this._textBanner.fill = "#ffffff";
            this.addChild(this._textBanner);

        }
    }
}