function manipulator() {
    let firstElement;
    let secondElement;
    let resultElement;

    const init = function (selector1, selector2, resultSelector) {
        firstElement = document.querySelector(selector1);
        secondElement = document.querySelector(selector2);
        resultElement = document.querySelector(resultSelector);
    };

    const add = function () {
        resultElement.value = Number(firstElement.value) + Number(secondElement.value);
    };

    const subtract = function () {
        resultElement.value = Number(firstElement.value) - Number(secondElement.value);
    };

    return { init, add, subtract };
}