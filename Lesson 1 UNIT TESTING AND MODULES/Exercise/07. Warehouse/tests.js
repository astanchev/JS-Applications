const Warehouse = require('./index.js');
const assert = require('chai').assert;

describe('Warehouse class test', () => {

    let warehouse;
    beforeEach(function () {
        warehouse = new Warehouse(20);
    });

    describe('constructor method tests', () => {

        it('should be created with correct params', () => {
            assert.deepEqual(warehouse, {
                _capacity: 20,
                availableProducts: {'Food': {}, 'Drink': {}}
            });
        });
    });

    describe('instance exist tests', function () {
        it('class should has following functions', function () {
            assert.isTrue(Warehouse.prototype.hasOwnProperty('constructor'));
            assert.isTrue(Warehouse.prototype.hasOwnProperty('addProduct'));
            assert.isTrue(Warehouse.prototype.hasOwnProperty('orderProducts'));
            assert.isTrue(Warehouse.prototype.hasOwnProperty('occupiedCapacity'));
            assert.isTrue(Warehouse.prototype.hasOwnProperty('revision'));
            assert.isTrue(Warehouse.prototype.hasOwnProperty('scrapeAProduct'));
        });

        it('instance should has following properties', () => {
            assert.property(warehouse, 'constructor');
            assert.property(warehouse, 'addProduct');
            assert.property(warehouse, 'orderProducts');
            assert.property(warehouse, 'occupiedCapacity');
            assert.property(warehouse, 'revision');
            assert.property(warehouse, 'scrapeAProduct');
        });

        it('instance should has following functions', () => {
            assert.isFunction(warehouse.constructor);
            assert.isFunction(warehouse.addProduct);
            assert.isFunction(warehouse.orderProducts);
            assert.isFunction(warehouse.occupiedCapacity);
            assert.isFunction(warehouse.revision);
            assert.isFunction(warehouse.scrapeAProduct);
        });
    });

    describe('accessors exist tests', function () {
        it('should has following accessors', function () {
            assert.isDefined(warehouse.capacity);
            assert.isDefined(warehouse.availableProducts);
        });
        it('should has following default values', function () {
            assert.equal(warehouse.capacity, 20);
            assert.equal(JSON.stringify(warehouse.availableProducts), '{"Food":{},"Drink":{}}');
        });
        it('should throw an error for an incorrect value', function () {
            const error = () => new Warehouse('javascript');
            assert.throws(error, 'Invalid given warehouse space');
        });
        it('should throw an error for a negative number', function () {
            const error = () => new Warehouse(-20);
            assert.throws(error, 'Invalid given warehouse space');
        });
        it('should throw an error for a zero number', function () {
            const error = () => new Warehouse(0);
            assert.throws(error, 'Invalid given warehouse space');
        });
    });

    describe('addProduct tests', function () {

        it('should throw error if there is no place for product', function () {
            warehouse.addProduct('Food', 'bread', 15);
            const error = () => warehouse.addProduct('Food', 'bread', 15);
            assert.throw(error, 'There is not enough space or the warehouse is already full');
        });

        it('should sum the quantity of single product', function () {
            warehouse.addProduct('Drink', 'water', 10);
            assert.equal(JSON.stringify(warehouse.availableProducts['Drink']), '{"water":10}');
        });

        it('should sum the quantity of multiple products', function () {
            warehouse.addProduct('Food', 'cake', 5);
            warehouse.addProduct('Food', 'cake', 5);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Food', 'bread', 5);
            assert.equal(JSON.stringify(warehouse.availableProducts['Food']), '{"cake":10,"bread":10}');
        });
    });

    describe('orderProducts', () => {
        it('should sort foods in descending order by quantity', () => {
            let warehouse = new Warehouse(12);
            warehouse.addProduct('Food', 'bread', 1);
            warehouse.addProduct('Food', 'potatoes', 2);
            warehouse.addProduct('Food', 'mushrooms', 3);
            warehouse.orderProducts('Food');
            let foods = JSON.stringify(warehouse.availableProducts.Food);
            assert.equal(foods, '{"mushrooms":3,"potatoes":2,"bread":1}');
        });

        it('should sort drinks in descending order by quantity', () => {
            let warehouse = new Warehouse(12);
            warehouse.addProduct('Drink', 'water', 1);
            warehouse.addProduct('Drink', 'cola', 2);
            warehouse.addProduct('Drink', 'lemonade', 3);
            warehouse.orderProducts('Drink');
            let drinks = JSON.stringify(warehouse.availableProducts.Drink);
            assert.equal(drinks, '{"lemonade":3,"cola":2,"water":1}');
        });
    });

    describe('occupiedCapacity tests', function () {

        it('should return already occupied place in warehouse', function () {
            warehouse.addProduct('Food', 'cake', 6);
            warehouse.addProduct('Food', 'pizza', 4);
            warehouse.addProduct('Food', 'cake', 6);
            warehouse.addProduct('Food', 'pizza', 4);
            warehouse.orderProducts('Food');
            assert.equal(warehouse.occupiedCapacity(), 20);
        });

        it('should return already occupied place in warehouse', function () {
            warehouse.addProduct('Drink', 'water', 6);
            warehouse.addProduct('Drink', 'coke', 4);
            warehouse.addProduct('Drink', 'water', 6);
            warehouse.addProduct('Drink', 'coke', 4);
            assert.equal(warehouse.occupiedCapacity(), 20);
        });
    });

    describe('revision tests', function () {

        it('should throw error if warehouse is empty', function () {
            assert.equal(warehouse.revision(), 'The warehouse is empty');
        });

        it('should return string with all available products in wh', function () {
            warehouse.addProduct('Food', 'cake', 5);
            warehouse.addProduct('Food', 'pasta', 5);
            warehouse.addProduct('Food', 'cookies', 5);
            warehouse.addProduct('Drink', 'coke', 5);
            assert.equal(warehouse.revision(), 'Product type - [Food]\n- cake 5\n- pasta 5\n- cookies 5\nProduct type - [Drink]\n- coke 5');
        });
    });

    describe('scrapeAProduct tests', function () {

        it('should reduce quantity of product', function () {
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.scrapeAProduct('bread', 5);
            assert.equal(warehouse.availableProducts['Food']['bread'], 5);
        });

        it('should reset quantity of product', function () {
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.scrapeAProduct('bread', 15);
            assert.equal(warehouse.availableProducts['Food']['bread'], 0);
        });

        it('should throw error message if cant find the product', function () {
            const product = 'vodka';
            assert.throw(() => warehouse.scrapeAProduct(product, 10), `${product} do not exists`);
        });
    });
});