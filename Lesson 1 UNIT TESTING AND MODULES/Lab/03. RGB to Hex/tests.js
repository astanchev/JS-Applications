const rgbToHexColor = require("./index.js");
const assert = require("chai").assert;

describe('rgbToHexColor() tests', () => {
    it('Should return correct result if passed correct data', () => {
        let actual = rgbToHexColor(0, 0, 0);
        let expected = "#000000";
        assert.equal(actual, expected);
    });
    it('Should return correct result if passed correct data', () => {
        let actual = rgbToHexColor(255, 255, 255);
        let expected = "#FFFFFF";
        assert.equal(actual, expected);
    });
    it("should return undefined if passed incorrect data", function() {
        assert.isUndefined(rgbToHexColor("a", 0, 0));
      });
    it("should return undefined if passed incorrect data", function() {
        assert.isUndefined(rgbToHexColor(0, -1, 0));
      });
    it("should return undefined if passed incorrect data", function() {
        assert.isUndefined(rgbToHexColor(0, 0, 256));
      });
});