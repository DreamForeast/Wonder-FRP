/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class MockObserver extends Observer{
        public static create(scheduler:TestScheduler) {
            var obj = new this(scheduler);

            return obj;
        }

        private _messages:[Record] = <[Record]>[];
        get messages(){
            return this._messages;
        }
        set messages(messages:[Record]){
            this._messages = messages;
        }

        private _scheduler:TestScheduler = null;

        constructor(scheduler:TestScheduler){
            super(null, null, null);

            this._scheduler = scheduler;
        }

        protected onNext(value){
            this._messages.push(Record.create(this._scheduler.clock, value));
            //this._scheduler.clock ++;
        }

        protected onError(error){
            this._messages.push(Record.create(this._scheduler.clock, error));
            //this._scheduler.clock ++;
        }

        protected onCompleted(){
            this._messages.push(Record.create(this._scheduler.clock, null));
            //this._scheduler.clock ++;
        }

        //todo refactor:extract Disposable mechanism
        public dispose(){
            //if(this.isDisposed){
            //    Log.log("only can dispose once");
            //    return;
            //}

            super.dispose();

            ////todo refactor, retain one?
            //this._cleanCallback();
            //this._cleanCallback2();

            this._scheduler.remove(this);
        }
    }
}
