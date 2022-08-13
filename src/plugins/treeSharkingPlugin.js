const t = require('@babel/types')
let visitor = {
    ImportDeclaration(NodePath, state) {
        console.log(state)
        const { opts } = state
        const { node } = NodePath
        const importSpecifiers = node.specifiers
        const parentSourceName = node.source.value
        let ImportArr = []
        if (
            opts.library == parentSourceName &&
            !t.isImportDefaultSpecifier(importSpecifiers[0])
        ) {
            importSpecifiers.forEach((importSpecifier) => {
                const ImportDefaultSpecifier = t.importDefaultSpecifier(
                    importSpecifier.local
                )
                const source = t.stringLiteral(
                    parentSourceName + '/' + importSpecifier.local.name
                )
                ImportArr.push(
                    t.importDeclaration([ImportDefaultSpecifier], source)
                )
            })
            // console.log(ImportArr)
            if (ImportArr.length == 1) {
                NodePath.replaceWith(ImportArr[0])
            } else {
                NodePath.replaceWithMultiple(ImportArr)
            }
        }
    }
}

module.exports = function () {
    return {
        visitor
    }
}
