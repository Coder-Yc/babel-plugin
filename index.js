const core = require("@babel/core");
const t = require("@babel/types");
const ArrowFunctionPlugin = require("./arrowPluginFunction");
const transformClasses = require("./transformClassPlugin2");

es6Code = `
const bar = () => {
	console.log(this)
}

`;

let es5Code = core.transform(es6Code, {
    plugins: [ArrowFunctionPlugin],
});

console.log(es5Code.code);
