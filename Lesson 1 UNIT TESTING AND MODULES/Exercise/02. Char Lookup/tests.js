const lookupChar = require('./index.js');
const assert = require('chai').assert;

describe.only('lookupChar() tests', () => {
    it('Should return undefined with non-string first parameter', () => {
        assert.isUndefined(lookupChar(15, 0));
    });
    it('Should return undefined with non-number second parameter', () => {
        assert.isUndefined(lookupChar('Peter', 'George'));
    });
    it('Should return undefined with float second parameter', () => {
        assert.isUndefined(lookupChar('Peter', 6.66));
    });
    it('Should return "Incorrect index" with incorrect index value', () => {
        assert.equal(lookupChar('Peter', 100), 'Incorrect index');
    });
    it('Should return "Incorrect index" with incorrect index value', () => {
        assert.equal(lookupChar('Peter', 5), 'Incorrect index');
    });
    it('Should return "Incorrect index" with incorrect index value', () => {
        assert.equal(lookupChar('Peter', -1), 'Incorrect index');
    });
    it('Should return correct value with correct index value', () => {
        assert.equal(lookupChar('Peter', 1), 'e');
    });
    it('Should return correct value with multiple correct index values', () => {
        assert.equal(lookupChar('Peter', 4), 'r');
        assert.equal(lookupChar('Peter', 0), 'P');
        assert.equal(lookupChar('Peter', 3), 'e');
    });
});