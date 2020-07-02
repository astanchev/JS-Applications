const createCalculator = require("./index.js");
const assert = require("chai").assert;

describe('createCalculator() tests', () => {

  let calculator;
  beforeEach('get fresh calculator', () => {
    calculator = createCalculator();
  });

  it('Should return object', () => {
    assert.isObject(calculator);
  });
  it('Should return object with add function', () => {
    assert.isFunction(calculator.add);
  });
  it('Should return object with subtract function', () => {
    assert.isFunction(calculator.subtract);
  });
  it('Should return object with get function', () => {
    assert.isFunction(calculator.get);
  });
  it('Should return undefine, trying to open internal value', () => {
    assert.isUndefined(calculator.value);
  });
  it('Should return 0 using get()', () => {
    assert.equal(calculator.get(), 0);
  });
  it("Should return correct result if a number is passed to .add()", () => {
    calculator.add(1);
    assert.equal(calculator.get(), 1);
  });
  it('Should return 16 for add("7"), add("9")', () => {
    calculator.add("7");
    calculator.add("9");
    assert.equal(calculator.get(), 16);
  });
  it("Should return correct result if a string containing a number is passed to .add()", () => {
    calculator.add("1");
    assert.equal(calculator.get(), 1);
  });
  it("Should return correct result if a number is passed to .subtract()", () => {
    calculator.subtract(1);
    assert.equal(calculator.get(), -1);
  });
  it("Should return correct result if a string containing a number is passed to .subtract()", () => {
    calculator.subtract("1");
    assert.equal(calculator.get(), -1);
  });
  it('Should return -16 for subtract("7"), subtract("9")', () => {
    calculator.subtract("7");
    calculator.subtract("9");
    assert.equal(calculator.get(), -16);
  });
  it("Should return Undefined if string is passed to .add()", () => {
    assert.isUndefined(calculator.add("a"));
  });
  it("Should return Undefined if string is passed to .subtract()", () => {
    assert.isUndefined(calculator.subtract("a"));
  });
  it('Should return NaN for add("code") and get()', () => {
    calculator.add('code');
    assert.isNaN(calculator.get());
  });
  it('Should return 20 for add(40), subtract(30), add(20), subtract(10)', () => {
    calculator.add(40);
    calculator.subtract(30);
    calculator.add(20);
    calculator.subtract(10);
    assert.equal(calculator.get(), 20);
  });
});