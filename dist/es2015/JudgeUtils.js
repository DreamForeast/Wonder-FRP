var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { JudgeUtils as JudgeUtils$ } from "wonder-commonlib/dist/es2015/utils/JudgeUtils";
var JudgeUtils = (function (_super) {
    __extends(JudgeUtils, _super);
    function JudgeUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JudgeUtils.isPromise = function (obj) {
        return !!obj
            && !_super.isFunction.call(this, obj.subscribe)
            && _super.isFunction.call(this, obj.then);
    };
    JudgeUtils.isEqual = function (ob1, ob2) {
        return ob1.uid === ob2.uid;
    };
    JudgeUtils.isIObserver = function (i) {
        return i.next && i.error && i.completed;
    };
    return JudgeUtils;
}(JudgeUtils$));
export { JudgeUtils };
//# sourceMappingURL=JudgeUtils.js.map