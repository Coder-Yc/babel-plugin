const t = require("@babel/types");
function hoistFunctionEnvironment(fnPath) {
    const thisEnvFn = fnPath.findParent((p) => {
        //this节点作用域向上查找副节点
        //如果父节点是一个函数,不能是箭头函数,或者根节点也可以
        return (p.isFunction() && !p.isArrowFunctionExpression) || p.isProgram;
    });
    //查找当前作用域里哪些用到了this的
    let thisPaths = getScopeInformation(fnPath);
    //声明一个别名变量
    let ThisBind = "_this";
    if (thisPaths.length > 0) {
        //往这个作用中添加一个标识
        thisEnvFn.scope.push({
            id: t.identifier(ThisBind),
            init: t.thisExpression(),
        });
    }
    thisPaths.forEach((thisPath) => {
        //创建一个_this的标识符
        let thisBindingRef = t.identifier(ThisBind);
        //把老的节点替换成新的节点
        thisPath.replaceWith(thisBindingRef);
    });
}

function getScopeInformation(fnPath) {
    let thisPaths = [];
    //遍历当前节点上所有自节点路径
    fnPath.traverse({
        ThisExpression(thisPath) {
            thisPaths.push(thisPath);
        },
    });
    return thisPaths;
}

module.exports = {
    visitor: {
        ArrowFunctionExpression(nodePath) {
            console.log(nodePath);
            let { node } = nodePath;
            const thisBindings = hoistFunctionEnvironment(nodePath);
            node.type = "FunctionExpression";
        },
    },
};
