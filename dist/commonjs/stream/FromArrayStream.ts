import { BaseStream } from "./BaseStream";
import { Scheduler } from "../core/Scheduler";
import { IObserver } from "../observer/IObserver";
import { SingleDisposable } from "../Disposable/SingleDisposable";

export class FromArrayStream extends BaseStream {
    public static create(array: Array<any>, scheduler: Scheduler) {
        var obj = new this(array, scheduler);

        return obj;
    }

    private _array: Array<any> = null;

    constructor(array: Array<any>, scheduler: Scheduler) {
        super(null);

        this._array = array;
        this.scheduler = scheduler;
    }

    public subscribeCore(observer: IObserver) {
        var array = this._array,
            len = array.length;

        function loopRecursive(i) {
            if (i < len) {
                observer.next(array[i]);

                loopRecursive(i + 1);
            } else {
                observer.completed();
            }
        }

        this.scheduler.publishRecursive(observer, 0, loopRecursive);

        return SingleDisposable.create();
    }
}