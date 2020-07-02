const StringBuilder = require('./index.js');
const assert = require('chai').assert;

describe('StringBuilder class tests', () => {

    let stringBuilder;
    beforeEach('get clean instance of class', () => {
        stringBuilder = new StringBuilder('hello world');
    });

    describe('function exist tests', () => {
        it('functions should exist', () => {
            assert.isTrue(StringBuilder.prototype.hasOwnProperty('constructor'));
            assert.isTrue(StringBuilder.prototype.hasOwnProperty('append'));
            assert.isTrue(StringBuilder.prototype.hasOwnProperty('prepend'));
            assert.isTrue(StringBuilder.prototype.hasOwnProperty('insertAt'));
            assert.isTrue(StringBuilder.prototype.hasOwnProperty('remove'));
            assert.isTrue(StringBuilder.prototype.hasOwnProperty('toString'));
            assert.isTrue(StringBuilder.hasOwnProperty('_vrfyParam'));
        });
    });

    describe('constructor function tests', () => {
        it('should be initialized with param', () => {
            const expected = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should be initialized without param', () => {
            stringBuilder = new StringBuilder();
            const expected = [];
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should throws an error for not a string param', () => {
            const expected = 'Argument must be string';
            const actual = () => stringBuilder = new StringBuilder({ a: 1 });
            assert.throws(actual, expected);
        });
    });

    describe('append funtion tests', () => {
        it('should add single string to the end', () => {
            const expected = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', ' ', 'c', 'o', 'd', 'e'];
            stringBuilder.append(' code');
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should add multiple strings to the end', () => {
            const expected = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', ' ', 'j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't', ' ', 'm', 'a', 'n', 'i', 'a'];
            stringBuilder.append(' java');
            stringBuilder.append('script');
            stringBuilder.append(' mania');
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should throws an error for not a string param', () => {
            const expected = 'Argument must be string';
            const actual = () => stringBuilder.append({ a: 1 });
            assert.throws(actual, expected);
        });
    });

    describe('prepend function tests', () => {
        it('should add single string to the beginning', () => {
            const expected = ['c', 'o', 'd', 'e', ' ', 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];
            stringBuilder.prepend('code ');
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should add multiple strings to the beginning', () => {
            const expected = ['j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't', ' ', 'm', 'a', 'n', 'i', 'a', ' ', 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];
            stringBuilder.prepend(' mania ');
            stringBuilder.prepend('script');
            stringBuilder.prepend('java');
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should throws an error for not a string param', () => {
            const expected = 'Argument must be string';
            const actual = () => stringBuilder.prepend({ a: 1 });
            assert.throws(actual, expected);
        });
    });

    describe('insertAt function tests', () => {
        it('should insert chars at the end', () => {
            const expected = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', ' ', 'c', 'o', 'd', 'e'];
            stringBuilder.insertAt(' code', 11);
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should insert chars at multiple indexes', () => {
            const expected = ['h', 'e', 'x', 'x', 'l', 'l', 'o', ' ', 'y', 'y', ' ', 'w', 'o', 'z', 'z', 'r', 'l', 'd'];
            stringBuilder.insertAt('zz', 8);
            stringBuilder.insertAt(' yy', 5);
            stringBuilder.insertAt('xx', 2);
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });
    });

    describe('remove function tests', () => {
        it('should remove chars at the beginning', () => {
            const expected = ['o', ' ', 'w', 'o', 'r', 'l', 'd'];
            stringBuilder.remove(0, 4);
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });

        it('should remove chars at multiple indexes', () => {
            const expected = ['h', 'e', ' ', 'o', 'r'];
            stringBuilder.remove(9, 2);
            stringBuilder.remove(6, 1);
            stringBuilder.remove(2, 3);
            const actual = stringBuilder._stringArray;
            assert.deepEqual(actual, expected);
        });
    });

    describe('toString function tests', () => {
        it('should return a string', () => {
            const expected = 'hello world';
            const actual = stringBuilder.toString();
            assert.equal(actual, expected);
        });

        it('should work with correct params', () => {
            stringBuilder = new StringBuilder('js mania');
            const expected = 'js mania';
            const actual = stringBuilder.toString();
            assert.equal(actual, expected);
        });
    });
});