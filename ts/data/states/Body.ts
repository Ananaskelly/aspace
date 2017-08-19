module TProject {

    export class Body extends OState {

		// УДАЛЯЕМ ТЕ ФУКЦИИ, КОТОРЫМИ НЕ ПОЛЬЗУЕМСЯ
        private _background: Phaser.Sprite;

        private _header: TextBanner;
        private _headerOSprite: OSprite;

        private _ananas: BaseAnanas;
        private _ananasOSprite: OSprite;

        private _scorePlank: ScorePlank;
        private _scorePlankOSprite: OSprite;

        private _arcade: Phaser.Physics.Arcade;

        private _manager: MiddleManager;

        constructor() {
            super(false); // true - и будут отслеживаться повороты
        }

        create(): void {
            _.log("Start game!");

            this._background = this.game.add.sprite(0, 0, "background");
            //this._background.anchor.set(0.5);
            //this._background.scale.setTo(2, 2);

            this._arcade = new Phaser.Physics.Arcade(this.game);

            this._manager = new MiddleManager();

            this._headerOSprite = new OSprite(Config.hw, 50);

            this._header = new TextBanner(this.game, 0, 0, 1000);
            this._headerOSprite.addChild(this._header);

            this._scorePlankOSprite = new OSprite(1000, 0);
            this._scorePlank = new ScorePlank(this.game, 70, 200, 3);
            this._scorePlankOSprite.addChild(this._scorePlank);

            this._ananasOSprite = new OSprite(Config.hw, Config.hh);
            this._ananas = new BaseAnanas(this.game, 0, 0, this._manager, this._arcade);
            this._ananas.activateAnanas();
            this._ananasOSprite.addChild(this._ananas);

            this._manager.initialize(this._ananas, this._scorePlank, 1000);
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