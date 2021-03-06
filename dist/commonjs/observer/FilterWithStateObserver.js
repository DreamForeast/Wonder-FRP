"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FilterObserver_1 = require("./FilterObserver");
var FilterState_1 = require("../enum/FilterState");
var FilterWithStateObserver = (function (_super) {
    __extends(FilterWithStateObserver, _super);
    function FilterWithStateObserver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isTrigger = false;
        return _this;
    }
    FilterWithStateObserver.create = function (prevObserver, predicate, source) {
        return new this(prevObserver, predicate, source);
    };
    FilterWithStateObserver.prototype.onNext = function (value) {
        var data = null;
        try {
            if (this.predicate(value, this.i++, this.source)) {
                if (!this._isTrigger) {
                    data = {
                        value: value,
                        state: FilterState_1.FilterState.ENTER
                    };
                }
                else {
                    data = {
                        value: value,
                        state: FilterState_1.FilterState.TRIGGER
                    };
                }
                this.prevObserver.next(data);
                this._isTrigger = true;
            }
            else {
                if (this._isTrigger) {
                    data = {
                        value: value,
                        state: FilterState_1.FilterState.LEAVE
                    };
                    this.prevObserver.next(data);
                }
                this._isTrigger = false;
            }
        }
        catch (e) {
            this.prevObserver.error(e);
        }
    };
    return FilterWithStateObserver;
}(FilterObserver_1.FilterObserver));
exports.FilterWithStateObserver = FilterWithStateObserver;
//# sourceMappingURL=FilterWithStateObserver.js.map