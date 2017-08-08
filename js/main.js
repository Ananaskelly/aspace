var TProject;
(function (TProject) {
    var Main = (function () {
        function Main() {
            TProject.Core.init(TProject.Config.defaultWidth, TProject.Config.defaultHeight);
            this.game = new Phaser.Game(TProject.Core.defaultWidth, TProject.Core.defaultHeight, Phaser.AUTO, "banner", null, false);
            this.game.state.add("Boot", TProject.Boot, true);
            this.game.state.add("Body", TProject.Body);
        }
        return Main;
    })();
    TProject.Main = Main;
})(TProject || (TProject = {}));
window.onload = function () {
    var game = new TProject.Main();
    setTimeout("window.scrollTo(0, 1)", 10);
};
