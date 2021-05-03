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
/* global bootstrap: false */
(function () {
    "use strict";
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
})();
