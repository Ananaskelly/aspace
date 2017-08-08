/**
 * Created by Ananasy on 28.07.2017.
 */
module TProject {
    export class BaseAnanas extends Phaser.Sprite {

        private _ananasScore: AnanasScore;
        private _scorePlank: ScorePlank;

        constructor(game: Phaser.Game, x: number, y: number, scorePlank: ScorePlank){
            super(game, x, y, '');
            this.anchor.set(0.5, 0.5);
            this.angle = - 90;
            this._scorePlank = scorePlank;
            this.loadTexture("Atlas", "pineapple");
        }

        public activateAnanas(){
            this.inputEnabled = true;
            this.events.onInputDown.add(this.onInputDown, this);
            this.events.onInputOver.add(this.onInputOver, this);
        }

        private onInputDown(){
            this.game.add.tween(this).to( { angle: -85 }, 10, Phaser.Easing.Linear.None, true, 0, 1, true);
            this._ananasScore = new AnanasScore(this.game, this.world.x, this.world.y);

            this._scorePlank.scoreUp();
        }

        private onInputOver() {
            this.game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 400, Phaser.Easing.Back.Out, true, 0, 0, true);
        }
    }
}
