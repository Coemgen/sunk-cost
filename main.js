"use strict";
var Test = /** @class */ (function () {
    function Test(input) {
        this.records = input;
    }
    Test.prototype.display = function () {
        this.records.forEach(function (item) { return console.log(item); });
    };
    return Test;
}());
var test = new Test(["abc", "def", "ghi"]);
test.display();
