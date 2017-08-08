/**
 * Created by Ananasy on 31.07.2017.
 */
module TProject {
    export class ScorePlank extends Phaser.Sprite {

        private _plankFrame: Phaser.Sprite;
        private _plankField: Phaser.Sprite;
        private _mask: PIXI.Graphics;
        private _scoreText: Phaser.Text;

        private _scoreValue: number;
        private _scopeStepSize: number;

        constructor (game: Phaser.Game, x: number, y: number, upValue: number){
            super(game, x, y);

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

        public scoreUp(){
            this._scoreValue += 100;
            this._scoreText.setText('' + this._scoreValue);
        }
    }
}