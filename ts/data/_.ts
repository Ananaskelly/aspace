module TProject {
    export class _ {

        static log = console.log;

        static randomInt(min: number, max: number): number {
            return Math.floor( (max - min + 0.1) * Math.random() ) + min;
        }

    }
}