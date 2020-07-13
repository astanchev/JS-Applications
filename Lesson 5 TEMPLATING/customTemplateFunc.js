let myTemplateEngine = (function () {
    let startDelimeter = '{{';
    let endDelimeter = '}}';
    let searchString = `${startDelimeter}?([A-Za-z]+)${endDelimeter}`;

    const setDelimeter = function (start, end) {
        startDelimeter = start || startDelimeter;
        endDelimeter = end || endDelimeter;
        searchString = `${startDelimeter}?([A-Za-z]+)${endDelimeter}`;
    };


    const compile = function (template) {
        const searchExp = new RegExp(searchString);

        return function (obj) {
            let match;
            let result = template;
            
            while(match = searchExp.exec(result)){
                result = result.replace(match[0], obj[match[1]]);
            }

            return result;
        };
    };

    return {
        compile: compile,
        setDelimeter: setDelimeter
    };

}());

let template = myTemplateEngine.compile('Hello my name is {{name}} {{familyName}}');

console.log(template({name: 'Ivan', familyName: 'Ivanov'}));

myTemplateEngine.setDelimeter('@@', '@@');

console.log(template({name: 'Gosho', familyName: 'Goshev'}));
let newTemplate = myTemplateEngine.compile('Hello @@name@@!');
console.log(newTemplate({name: 'Pesho'}));