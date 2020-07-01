const createCalculator = require("./index.js");
const assert = require("chai").assert;

describe('createCalculator() tests', () => {
    it('Should return object', () => {
        assert.isObject(createCalculator());
    });
    it('Should return object with add function', () => {
        let actual = createCalculator();
        assert.isFunction(actual.add);
    });
    it('Should return object with subtract function', () => {
        let actual = createCalculator();
        assert.isFunction(actual.subtract);
    });
    it('Should return object with get function', () => {
        let actual = createCalculator();
        assert.isFunction(actual.get);
    });
    it('Should return undefine, trying to open internal value', () => {
        let actual = createCalculator();
        assert.isUndefined(actual.value);
    });
    it('Should return 0 using get()', () => {
        let actual = createCalculator();
        assert.equal(actual.get(), 0);
    });
    it("Should return correct result if a number is passed to .add()", () => {
        let actual = createCalculator();
        actual.add(1);
        assert.equal(actual.get(), 1);
      });
      it("Should return correct result if a string containing a number is passed to .add()", () => {
        let actual = createCalculator();
        actual.add("1");
        assert.equal(actual.get(), 1);
      });
      it("Should return correct result if a number is passed to .subtract()", () => {
        let actual = createCalculator();
        actual.subtract(1);
        assert.equal(actual.get(), -1);
      });
      it("Should return correct result if a string containing a number is passed to .subtract()", () => {
        let actual = createCalculator();
        actual.subtract("1");
        assert.equal(actual.get(), -1);
      });
      it("Should return Undefined if string is passed to .add()", () => {
        let actual = createCalculator();
        assert.isUndefined(actual.add("a"));
      });
      it("Should return Undefined if string is passed to .subtract()", () => {
        let actual = createCalculator();
        assert.isUndefined(actual.subtract("a"));
      });
});