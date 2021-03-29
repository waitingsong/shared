import {
  ts,
  SourceFile,
  Project,
  CallExpression,
  SyntaxKind,
  TypeNode,
} from 'ts-morph'


export function createSourceFile(
  tsConfigFilePath: string,
  sourcePath: string,
): SourceFile {

  const project = new Project({ tsConfigFilePath })
  // const checker = project.getTypeChecker()
  const sourceFile = project.addSourceFileAtPath(sourcePath)
  return sourceFile
}

export function hasImportNecessaryType(
  file: SourceFile,
  matchTypeNames: string[],
  moduleName: string,
): number {

  if (! moduleName) {
    throw new Error('Value of param moduleName empty')
  }

  let inserted = 0

  const arr = file.getDescendantsOfKind(SyntaxKind.ImportSpecifier)
  const exists = arr.map(item => item.getText())

  matchTypeNames.forEach((typeName) => {
    const name = typeName.trim()
    if (exists.includes(name)) {
      return
    }
    const code = `import { ${name} } from '${moduleName}'`
    file.insertStatements(0, code)
    inserted += 1
  })

  return inserted
}


export function retrieveTypeArgmentsFromCallExpression(
  input: CallExpression<ts.CallExpression>,
): TypeNode<ts.TypeNode>[] {

  const nodes = input.getTypeArguments()
  return nodes
}

export function retrieveFirstTypeArgmentTextFromCallExpression(
  input: CallExpression<ts.CallExpression>,
): string {

  const [node] = retrieveTypeArgmentsFromCallExpression(input)

  if (! node) {
    return ''
  }
  const name = node.getText()
  return name
}


export function findCallExpressionsByName(
  file: SourceFile,
  matchName: string,
): CallExpression<ts.CallExpression>[] {

  const regx = new RegExp(`\\b${matchName}\\s*<\\s*\\S+\\s*>`, 'u')

  const arr = file.getDescendantsOfKind(SyntaxKind.CallExpression)
  const ret = arr.filter((expression) => {
    const code = expression.getText()
    if (! regx.test(code)) {
      return false
    }
    // const parentNode = expression.getParent()
    // if (parentNode) {
    //   const pKindName = parentNode.getKindName()
    //   console.log({ code, pKindName })
    // }
    return true
  })

  return ret
}

