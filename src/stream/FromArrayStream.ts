/// <reference path="BaseStream"/>
/// <reference path="../core/Scheduler"/>
module dyRt{
    export class FromArrayStream extends BaseStream{
        private _array:[any] = null;

        constructor(array:[any], scheduler:Scheduler){
            super(null);

            this._array = array;
            this.scheduler = scheduler;
        }

        public subscribeCore(){
            var array = this._array,
                len = array.length;

            //function loopRecursive(i, selfFunc) {
                function loopRecursive(i, next, completed) {
                if (i < len) {
                    next(array[i]);
                    //observer.next(array[i]);
                    arguments.callee(i + 1, next, completed);
                    //selfFunc(i + 1, selfFunc);
                } else {
                    completed();
                    //observer.completed();
                }
            }
            this.scheduler.publishRecursive(0, loopRecursive);

            return function(){
            };
        }
    }
}