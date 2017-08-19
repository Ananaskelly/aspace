/**
 * Created by Ananasy on 17.08.2017.
 */
module TProject {
    export class MiddleManager {
        private _ananas: BaseAnanas;
        private _scorePlank: ScorePlank;

        private _maxRate: Number;

        constructor(){}

        public initialize(ananas: BaseAnanas, scorePlank: ScorePlank, maxRate: Number){
            this._ananas = ananas;
            this._scorePlank = scorePlank;
            this._maxRate = maxRate;
        }

        public handleClick(){

            if (this._scorePlank.getCurrentScore() < this._maxRate){
                this._ananas.onClickHandle();
                this._scorePlank.scoreUp();
            } else {
                this._ananas.pullAnanas();
            }
        }

    }
}