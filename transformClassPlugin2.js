const t = require("@babel/types");

module.exports = {
    visitor: {
        ClassDeclaration(nodePath) {
            console.log(nodePath);
            let { node } = nodePath;
            let id = node.id; //拿到属性id {type: "Identifier", name: "bar"}
            let methods = node.body.body;
            let nodes = [];
            methods.forEach((method) => {
                if (method.kind === "constructor") {
                    let constructorFunction = t.functionExpression(
                        id,
                        method.params,
                        method.body,
                        method.generator,
                        method.async
                    );
                    nodes.push(constructorFunction);
                } else {
                    //left
                    let key = method.key;
                    let memberI = t.memberExpression(
                        id,
                        t.identifier("prototype")
                    );
                    let memberO = t.memberExpression(memberI, key);

                    //right
                    let functionExpression = t.functionExpression(
                        id,
                        method.params,
                        method.body,
                        method.generator,
                        method.async
                    );

                    let AssignmentExpression = t.assignmentExpression(
                        "=",
                        memberO,
                        functionExpression
                    );
                    nodes.push(AssignmentExpression);
                }
            });
            if (nodes.length == 1) {
                nodePath.replaceWith(node[0]);
            } else {
                nodePath.replaceWithMultiple(nodes);
            }
        },
    },
};
