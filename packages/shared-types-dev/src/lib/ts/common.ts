import { LiteralObject } from '@waiting/shared-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript'


export function createObjectLiteralExpression(
  input: LiteralObject,
): ts.ObjectLiteralExpression {

  const arr: ts.ObjectLiteralElementLike[] = Object.entries(input).map(([key, value]) => {
    if (Array.isArray(value)) {
      throw new TypeError('property value not literal object, but array. key: ' + key)
    }
    else if (typeof value === 'string') {
      const node = createPropertyAssignmentOfString(key, value)
      return node
    }
    else if (typeof value === 'object' && Object.keys(value).length) {
      const node = createPropertyAssignmentOfObject(key, value)
      return node
    }
    throw new TypeError('property value not literal object. key: ' + key)
  })
  const ret = ts.factory.createObjectLiteralExpression(arr, true)
  return ret
}

function createPropertyAssignmentOfString(
  key: string,
  value: string,
): ts.PropertyAssignment {

  const ret = ts.factory.createPropertyAssignment(
    ts.factory.createIdentifier(key),
    ts.factory.createStringLiteral(value),
  )
  return ret
}


function createPropertyAssignmentOfObject(
  key: string,
  value: LiteralObject,
): ts.PropertyAssignment {

  const id = ts.factory.createIdentifier(key)
  const expression = createObjectLiteralExpression(value)

  const arr = ts.factory.createPropertyAssignment(
    id,
    expression,
  )
  return arr
}


/**
 * Generate ImportDeclaration from existing node of ImportDeclaration,
 * return undefined if none importSpecifier according to param skipSpecifiers
 */
export function processImportDeclaration(
  node: ts.ImportDeclaration,
  skipSpecifiers: string[],
): ts.ImportDeclaration | undefined {

  const module = (node.moduleSpecifier as ts.StringLiteral).text // not getText()
  // console.info({ module })
  if (! module) {
    return
  }

  const st = new Set<string>()

  const binds = node.importClause?.namedBindings
  if (binds && binds.kind === ts.SyntaxKind.NamedImports) {
    binds.elements.forEach((elm: ts.ImportSpecifier) => {
      const elmText = elm.getText()
      if (elmText && ! skipSpecifiers.includes(elmText)) {
        st.add(elmText)
      }
    })
  }

  if (! st.size) {
    return
  }

  const arr: ts.ImportSpecifier[] = []
  st.forEach((name) => {
    const sp = ts.factory.createImportSpecifier(
      undefined,
      ts.factory.createIdentifier(name),
    )
    arr.push(sp)
  })
  if (! arr.length) {
    return
  }
  const nameImports: ts.NamedImports = ts.factory.createNamedImports(arr)
  const importClause: ts.ImportClause = ts.factory.createImportClause(
    false,
    undefined,
    nameImports,
  )
  const importDecl: ts.ImportDeclaration = ts.factory.createImportDeclaration(
    undefined,
    undefined,
    importClause,
    ts.factory.createStringLiteral(module),
  )
  return importDecl
}

