/**
 * Created by Ananasy on 31.07.2017.
 */
module TProject {
    export class ScorePlank extends Phaser.Sprite {

        private _scoreText: Phaser.Text;

        private _scoreValue: number;
        private _scopeStepSize: number;

        constructor (game: Phaser.Game, x: number, y: number, upValue: number){
            super(game, x, y);

            this.anchor.set(0.5,0.5);
            this._scoreValue = 0;
            this._scopeStepSize = upValue;

            this._scoreText = this.game.add.text(0, 0, '' + this._scoreValue, {font: '40px Acme'});
            this._scoreText.anchor.set(0.5, 0.5);
            this._scoreText.fill = "#ffffff";
            this.addChild(this._scoreText);

        }

        public scoreUp(){
            this._scoreValue += 100;
            this.game.add.tween(this._scoreText.scale).to({x: 1.2, y: 1.2}, 200, Phaser.Easing.Back.Out, true, 0, 0, true).onComplete.add(() => {this._scoreText.setText('' + this._scoreValue)}, this._scoreText);
        }

        public getCurrentScore(){
            return this._scoreValue;
        }
    }
}