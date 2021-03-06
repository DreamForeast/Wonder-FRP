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
var BaseStream_1 = require("../stream/BaseStream");
var SingleDisposable_1 = require("../Disposable/SingleDisposable");
var TestStream = (function (_super) {
    __extends(TestStream, _super);
    function TestStream(messages, scheduler) {
        var _this = _super.call(this, null) || this;
        _this.scheduler = null;
        _this._messages = null;
        _this._messages = messages;
        _this.scheduler = scheduler;
        return _this;
    }
    TestStream.create = function (messages, scheduler) {
        var obj = new this(messages, scheduler);
        return obj;
    };
    TestStream.prototype.subscribeCore = function (observer) {
        this.scheduler.setStreamMap(observer, this._messages);
        return SingleDisposable_1.SingleDisposable.create();
    };
    return TestStream;
}(BaseStream_1.BaseStream));
exports.TestStream = TestStream;
//# sourceMappingURL=TestStream.js.map