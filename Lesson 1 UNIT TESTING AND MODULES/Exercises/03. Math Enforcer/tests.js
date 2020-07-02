const assert = require('chai').assert;
const mathEnforcer = require('./index.js');

describe('mathEnforcer() tests', () => {
    describe('mathEnforcer.addFive() tests', () => {
        it('Should return undefined with not correct parameter', () => {
            assert.isUndefined(mathEnforcer.addFive('a'));
        });
        it('Should return undefined with not correct parameter', () => {
            assert.isUndefined(mathEnforcer.addFive({name: 'a'}));
        });
        it('Should return correct result with correct positive int parameter', () => {
            assert.equal(mathEnforcer.addFive(5), 10);
        });
        it('Should return correct result with correct negative int parameter', () => {
            assert.equal(mathEnforcer.addFive(-5), 0);
        });
        it('Should return correct result with correct positive double parameter', () => {
            assert.closeTo(mathEnforcer.addFive(5.3300033), 10.33, 0.01);
        });
    });

    describe('mathEnforcer.subtractTen() tests', () => {
        it('Should return undefined with not correct parameter', () => {
            assert.isUndefined(mathEnforcer.subtractTen('a'));
        });
        it('Should return undefined with not correct parameter', () => {
            assert.isUndefined(mathEnforcer.subtractTen({name: 'a'}));
        });
        it('Should return correct result with correct positive int parameter', () => {
            assert.equal(mathEnforcer.subtractTen(25), 15);
        });
        it('Should return correct result with correct negative int parameter', () => {
            assert.equal(mathEnforcer.subtractTen(-5), -15);
        });
        it('Should return correct result with correct positive double parameter', () => {
            assert.closeTo(mathEnforcer.subtractTen(5.3300033), -4.67, 0.01);
        });
    });

    describe('mathEnforcer.sum() tests', () => {
        it('Should return undefined with not correct first parameter', () => {
            assert.isUndefined(mathEnforcer.sum('a', 5));
        });
        it('Should return undefined with not correct first parameter', () => {
            assert.isUndefined(mathEnforcer.sum({name: 'a'}, 5));
        });
        it('Should return undefined with not correct second parameter', () => {
            assert.isUndefined(mathEnforcer.sum(5, 'a'));
        });
        it('Should return undefined with not correct second parameter', () => {
            assert.isUndefined(mathEnforcer.sum(5, {name: 'a'}));
        });
        it('Should return undefined with not correct two parameters', () => {
            assert.isUndefined(mathEnforcer.sum('a', {name: 'a'}));
        });
        it('Should return correct result with correct positive int parameters', () => {
            assert.equal(mathEnforcer.sum(25, 25), 50);
        });
        it('Should return correct result with correct negative int parameters', () => {
            assert.equal(mathEnforcer.sum(-5, -10), -15);
        });
        it('Should return correct result with correct positive and negative int parameters', () => {
            assert.equal(mathEnforcer.sum(5, -10), -5);
        });
        it('Should return correct result with correct positive double parameters', () => {
            assert.closeTo(mathEnforcer.sum(5.3300033, 2.3678), 7.69, 0.01);
        });
    });
});