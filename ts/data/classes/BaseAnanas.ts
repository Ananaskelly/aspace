/**
 * Created by Ananasy on 28.07.2017.
 */
module TProject {
    export class BaseAnanas extends Phaser.Sprite {

        private _ananasScore: AnanasScore;
        private _manager: MiddleManager;

        private _arcade: Phaser.Physics.Arcade;
        private _arcadeSpriteWarp: Phaser.Physics.Arcade.Body;

        private _timer: Phaser.Timer;

        constructor(game: Phaser.Game, x: number, y: number, manager: MiddleManager, arcade: Phaser.Physics.Arcade){
            super(game, x, y, '');
            this.anchor.set(0.5, 0.5);
            this._manager = manager;
            this._arcade = arcade;
            this.loadTexture("Atlas", "pineapple");
            this._arcadeSpriteWarp = new Phaser.Physics.Arcade.Body(this);
            this.body = this._arcadeSpriteWarp;
            this.body.velocity = new Phaser.Point(0, 0);
        }

        public activateAnanas(){
            this.inputEnabled = true;
            this.events.onInputDown.add(this.onInputDown, this);
            this.events.onInputOver.add(this.onInputOver, this);
        }

        public onClickHandle(){
            this.game.add.tween(this).to( { angle: 5 }, 10, Phaser.Easing.Linear.None, true, 0, 1, true);
            this._ananasScore = new AnanasScore(this.game, this.world.x, this.world.y);
        }

        public pullAnanas(){
            this.game.add.tween(this.scale).to({x: 0.7, y: 0.7}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);

            this.body.velocity = new Phaser.Point(0, -800);
            this._arcadeSpriteWarp.acceleration.y = -1000;
            this._arcade.accelerateToXY(this, this.x, 0);
        }

        private onInputDown(){
            this._manager.handleClick();
        }

        private onInputOver() {
            this.game.add.tween(this.scale).to({x: 1.2, y: 1.2}, 400, Phaser.Easing.Back.Out, true, 0, 0, true);
        }

        private destroyAnanas(){
            this._arcadeSpriteWarp.destroy();
            this.destroy();
        }
    }
}
