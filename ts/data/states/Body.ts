module TProject {

    export class Body extends OState {

		// УДАЛЯЕМ ТЕ ФУКЦИИ, КОТОРЫМИ НЕ ПОЛЬЗУЕМСЯ
        private _background: Phaser.Sprite;

        private _ananas: BaseAnanas;
        private _ananasOSprite: OSprite;

        private _scorePlank: ScorePlank;
        private _scorePlankOSprite: OSprite;

        constructor() {
            super(false); // true - и будут отслеживаться повороты
        }

        create(): void {
            _.log("Start game!");

            this._background = this.game.add.sprite(0, 0, "background");
            this._background.anchor.set(0.5);
            this._background.scale.setTo(2, 2);

            this._scorePlankOSprite = new OSprite(Core.defaultWidth, 0);
            this._scorePlank = new ScorePlank(this.game, 50, 250, 3);
            this._scorePlankOSprite.addChild(this._scorePlank);

            this._ananasOSprite = new OSprite(this.game.world.centerX, this.game.world.centerY);
            this._ananas = new BaseAnanas(this.game, 0, 0, this._scorePlank);
            this._ananas.activateAnanas();
            this._ananasOSprite.addChild(this._ananas);
        }

        update(): void {
          
        } 

        // а это то самое отслеживание поворотов
		onPortret(): void {
            _.log("Portret");
        }

        onLandscape(): void {
            _.log("Landscape");
        }

    }
}