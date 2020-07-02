const PaymentPackage = require('./index');
const assert = require('chai').assert;

describe('PaymentPackage class tests', () => {

    let paymentPackage;
    beforeEach('get clean instance of class', () => {
        paymentPackage = new PaymentPackage('HR Services', 1000);
    });

    describe('constructor method tests', () => {

        it('should be created with correct params', () => {
            assert.deepEqual(paymentPackage, {
                _name: 'HR Services',
                _value: 1000,
                _VAT: 20,
                _active: true
            });
        });

        it('should be created multiple instances with correct params', () => {
            paymentPackage = [
                new PaymentPackage('HR Services', 1500),
                new PaymentPackage('Consultation', 800),
                new PaymentPackage('Partnership Fee', 7000),
            ];
            assert.deepEqual(paymentPackage,
                [{
                        _name: 'HR Services',
                        _value: 1500,
                        _VAT: 20,
                        _active: true
                    },
                    {
                        _name: 'Consultation',
                        _value: 800,
                        _VAT: 20,
                        _active: true
                    },
                    {
                        _name: 'Partnership Fee',
                        _value: 7000,
                        _VAT: 20,
                        _active: true
                    }
                ]);
        });
    });

    describe('structure of instance should be correct', () => {
        it('instance should be correct', () => {
            assert.property(paymentPackage, '_name');
            assert.property(paymentPackage, '_value');
            assert.property(paymentPackage, '_VAT');
            assert.property(paymentPackage, '_active');
            assert.property(paymentPackage, 'toString');
            assert.isFunction(paymentPackage.toString);
        });
    });

    describe('accessor name tests', () => {

        it('should throws an error for not a string', () => {
            const error = () => paymentPackage.name = {
                a: 1
            };
            assert.throws(error, 'Name must be a non-empty string');
        });

        it('should throws an error for an empty string', () => {
            const error = () => paymentPackage.name = '';
            assert.throws(error, 'Name must be a non-empty string');
        });

        it('should change the name', () => {
            paymentPackage.name = 'Consultation';
            assert.equal(paymentPackage._name, 'Consultation');
        });
    });

    describe('accessor value tests', () => {

        it('should throws an error for not a number', () => {
            const error = () => paymentPackage.value = 'javascirpt';
            assert.throws(error, 'Value must be a non-negative number');
        });

        it('should throws an error for a negative number', () => {
            const error = () => paymentPackage.value = -1500;
            assert.throws(error, 'Value must be a non-negative number');
        });

        it('should change the value', () => {
            paymentPackage.value = 2000;
            assert.equal(paymentPackage._value, 2000);
        });

        it('should change the value if 0 is given', function () {
            paymentPackage.value = 0;
            assert.equal(paymentPackage._value, 0);
        });
    });

    describe('accessor VAT tests', () => {

        it('should throws an error for not a number', () => {
            const error = () => paymentPackage.VAT = 'javascript';
            assert.throws(error, 'VAT must be a non-negative number');
        });

        it('should throws an error for a negative number', () => {
            const error = () => paymentPackage.VAT = -10;
            assert.throws(error, 'VAT must be a non-negative number');
        });

        it('should change the VAT', () => {
            paymentPackage.VAT = 0;
            assert.equal(paymentPackage._VAT, 0);
        });
    });

    describe('accessor active tests', () => {

        it('should throws an error for not a boolean', () => {
            const error = () => paymentPackage.active = 'javascript';
            assert.throws(error, 'Active status must be a boolean');
        });

        it('should change the status', () => {
            paymentPackage.active = false;
            assert.equal(paymentPackage._active, false);
        });
    });

    describe('toString method tests', () => {

        it('should return toString with active status', () => {
            const expected = 'Package: HR Services\n- Value (excl. VAT): 1000\n- Value (VAT 20%): 1200';
            const actual = paymentPackage.toString();
            assert.equal(actual, expected);
        });

        it('should return toString with inactive status', () => {
            const expected = 'Package: HR Services (inactive)\n- Value (excl. VAT): 1000\n- Value (VAT 20%): 1200';
            paymentPackage.active = false;
            const actual = paymentPackage.toString();
            assert.equal(expected, actual);
        });
    });
});