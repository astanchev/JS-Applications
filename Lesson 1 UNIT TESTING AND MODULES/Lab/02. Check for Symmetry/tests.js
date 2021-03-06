const isSymmetric = require("./index.js");
const assert = require("chai").assert;

describe('isSymmetric() tests', () => {
    it('Should return false if is not array', () => {
        let arr = "abc";
        assert.isFalse(isSymmetric(arr));
    });
    it('Should return false if is not array', () => {
        let arr = { a: 5 };
        assert.isNotTrue(isSymmetric(arr));
    });
    it('Should return false if is array, but not symmetric', () => {
        let arr = [1, 2];
        assert.isFalse(isSymmetric(arr));
    });
    it('Should return false if is array, but not symmetric', () => {
        let arr = [1, 2, 3, 4, 5];
        assert.isNotTrue(isSymmetric(arr));
    });
    it('Should return true if is array with length 1', () => {
        let arr = [1];
        assert.isTrue(isSymmetric(arr));
    });
    it('Should return true if is number array and symmetric', () => {
        let arr = [1, 2, 3, 2, 1];
        assert.isNotFalse(isSymmetric(arr));
    });
    it('Should return true if is string array and symmetric', () => {
        let arr = ['a', 'b', 'b', 'a'];
        assert.isNotFalse(isSymmetric(arr));
    });
    it('Should return true if is mixed array and symmetric', () => {
        let arr = [{ a: 1 }, ['a', '1'], ['a', '1'], { a: 1 }];
        assert.isTrue(isSymmetric(arr));
    });
});