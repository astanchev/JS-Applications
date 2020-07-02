const isOddOrEven = require('./index.js');
const assert = require('chai').assert;

describe('isOddOrEven() tests', () => {
    it('Should return undefined with a number parameter', () => {
        assert.isUndefined(isOddOrEven(8));
    });
    it('Should return undefined with an object parameter', () => {
        assert.isUndefined(isOddOrEven({name: 'George'}));
    });
    it('Should work correctly with string with even length', () => {
        assert.equal(isOddOrEven('roar'), 'even');
    });
    it('Should work correctly with string with odd length', () => {
        assert.equal(isOddOrEven('Peter'), 'odd');
    });
    it('Should return correct values with multiple consecutive checks', () => {
        assert.equal(isOddOrEven('bird'), 'even');
        assert.equal(isOddOrEven('cat'), 'odd');
        assert.equal(isOddOrEven('dog'), 'odd');
    });
});