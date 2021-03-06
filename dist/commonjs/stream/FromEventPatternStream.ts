import { BaseStream } from "./BaseStream";
import { IObserver } from "../observer/IObserver";
import { SingleDisposable } from "../Disposable/SingleDisposable";

export class FromEventPatternStream extends BaseStream {
    public static create(addHandler: Function, removeHandler: Function) {
        var obj = new this(addHandler, removeHandler);

        return obj;
    }

    private _addHandler: Function = null;
    private _removeHandler: Function = null;

    constructor(addHandler: Function, removeHandler: Function) {
        super(null);

        this._addHandler = addHandler;
        this._removeHandler = removeHandler;
    }

    public subscribeCore(observer: IObserver) {
        var self = this;

        function innerHandler(event) {
            observer.next(event);
        }

        this._addHandler(innerHandler);

        return SingleDisposable.create(() => {
            self._removeHandler(innerHandler);
        });
    }
}