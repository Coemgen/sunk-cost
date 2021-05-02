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
