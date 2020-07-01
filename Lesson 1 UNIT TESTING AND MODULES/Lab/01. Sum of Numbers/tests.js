const sum = require("./index.js");
const assert = require("chai").assert;

describe("sum() tests", function() {
  it("should return correct result if passed number array", function() {
    let actual = sum([1, 2, 3]);
    let expected = 6;
    assert.equal(actual, expected);
  });
  it("should return correct result if passed number array with length === 1", function() {
    let actual = sum([1]);
    let expected = 1;
    assert.equal(actual, expected);
  });
  it("should return correct result if passed number array with length === 0", function() {
    let actual = sum([]);
    let expected = 0;
    assert.equal(actual, expected);
  });
  it("should return NAN if passed not number array", function () {
     assert.isNaN(sum("abc")); 
  });
});