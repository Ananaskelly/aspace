var TProject;
(function (TProject) {
    var _ = (function () {
        function _() {
        }
        _.randomInt = function (min, max) {
            return Math.floor((max - min + 0.1) * Math.random()) + min;
        };
        _.log = console.log;
        return _;
    })();
    TProject._ = _;
})(TProject || (TProject = {}));
