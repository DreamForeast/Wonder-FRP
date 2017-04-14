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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("wonder-commonlib/dist/commonjs/Log");
var BaseStream_1 = require("./BaseStream");
var contract_1 = require("../definition/typescript/decorator/contract");
var SingleDisposable_1 = require("../Disposable/SingleDisposable");
var Variable_1 = require("../global/Variable");
var TimeoutStream = (function (_super) {
    __extends(TimeoutStream, _super);
    function TimeoutStream(time, scheduler) {
        var _this = _super.call(this, null) || this;
        _this._time = null;
        _this._time = time;
        _this.scheduler = scheduler;
        return _this;
    }
    TimeoutStream.create = function (time, scheduler) {
        var obj = new this(time, scheduler);
        return obj;
    };
    TimeoutStream.prototype.subscribeCore = function (observer) {
        var id = null;
        id = this.scheduler.publishTimeout(observer, this._time, function (time) {
            observer.next(time);
        });
        return SingleDisposable_1.SingleDisposable.create(function () {
            Variable_1.root.clearTimeout(id);
        });
    };
    return TimeoutStream;
}(BaseStream_1.BaseStream));
__decorate([
    contract_1.requireCheck(function (time, scheduler) {
        contract_1.assert(time > 0, Log_1.Log.info.FUNC_SHOULD("time", "> 0"));
    })
], TimeoutStream, "create", null);
exports.TimeoutStream = TimeoutStream;
//# sourceMappingURL=TimeoutStream.js.map