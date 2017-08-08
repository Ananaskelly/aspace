
module TProject {

    export class Main {

        public game : Phaser.Game; 

        constructor() {
		
            Core.init(Config.defaultWidth, Config.defaultHeight);

            this.game = new Phaser.Game(
                Core.defaultWidth, Core.defaultHeight,
                Phaser.AUTO, "banner", null, false);

            this.game.state.add("Boot", Boot, true);
            this.game.state.add("Body", Body);
        }

    }

}

window.onload = () => {
    var game = new TProject.Main();

    setTimeout("window.scrollTo(0, 1)", 10)
};