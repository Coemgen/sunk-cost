class Test {
  records: string[];
  constructor(input: string[]) {
    this.records = input;
  }
  display() {
    this.records.forEach((item) => console.log(item));
  }
}

const test = new Test(["abc", "def", "ghi"]);
test.display();

/* global bootstrap: false */
(function () {
  "use strict";
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();
