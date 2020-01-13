const Console = require('./c-Sharp-Console');
const assert = require('chai').assert;

describe("Console class tests", function () {

    it('should throw a TypeError with message', function () {
        const error = () => Console.writeLine();
        assert.throws(error, TypeError, 'No string format given!');
    });

    it('should return object in JSON format if argument is an object', function () {
        const person = { name: "Ivan", age: 25 };
        const expected = JSON.stringify(person);
        const actual = Console.writeLine(person);
        assert.equal(actual, expected);
    });

    it('should return same string with placeholders if argument is single string', function () {
        const expected = 'Some string with {0} placeholders {1}';
        const actual = Console.writeLine(expected);
        assert.equal(actual, expected);
    });

    it('should return undefined if argument is single non string', function () {
        const expected = 55;
        const actual = Console.writeLine(expected);
        assert.isUndefined(actual);
    });

    it('should throw a TypeError with message', function () {
        const expected = 55;
        const error = () => Console.writeLine(expected, expected, expected);
        assert.throws(error, TypeError, 'No string format given!');
    });

    it('should throw a RangeError with message', function () {
        const str = 'Some text {0} with {1} placeholders.';
        const arg1 = 22;
        const arg2 = 123;
        const arg3 = 'some text';
        const error = () => Console.writeLine(str, arg1, arg2, arg3);
        assert.throws(error, RangeError, 'Incorrect amount of parameters given!');
    });

    it('should throw a RangeError with message', function () {
        const str = 'Some text {0} with {12} placeholders.';
        const arg1 = 22;
        const arg2 = 123;
        const error = () => Console.writeLine(str, arg1, arg2);
        assert.throws(error, RangeError, 'Incorrect placeholders given!');
    });

    it('should return replaced string', function () {
        const str = 'Some text {0} with {1} placeholders.';
        const expected = 'Some text 22 with 123 placeholders.';
        const arg1 = 22;
        const arg2 = 123;

        const actual = Console.writeLine(str, arg1, arg2);
        assert.equal(actual, expected);
    });
});