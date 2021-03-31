import {
  pathResolve,
  dirname,
} from '@waiting/shared-core'
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

  // const binds = node.importClause?.namedBindings
  const binds = node.importClause ? node.importClause.namedBindings : void 0
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
      void 0,
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
    void 0,
    nameImports,
  )
  const importDecl: ts.ImportDeclaration = ts.factory.createImportDeclaration(
    void 0,
    void 0,
    importClause,
    ts.factory.createStringLiteral(module),
  )
  return importDecl
}


export function isKeysImportExpression(
  node: ts.Node,
  jsPath: string,
  tsPath: string,
): node is ts.ImportDeclaration {

  if (! ts.isImportDeclaration(node)) {
    return false
  }
  const module = (node.moduleSpecifier as ts.StringLiteral).text // not getText()
  try {
    if (module.startsWith('.')) {
      const resolvedPath = pathResolve(dirname(node.getSourceFile().fileName), module)
      const path = require.resolve(resolvedPath)
      // console.info({
      //   module, fupath: path, jsPath, tsPath,
      // })
      return (path === jsPath || path === tsPath) && !! path
    }
    else {
      const path = require.resolve(module)
      // console.info({
      //   module, fupath: path, jsPath, tsPath,
      // })
      return path === jsPath && !! path
    }
  }
  catch (ex) {
    // console.info({ module })
    return false
  }
}


export function isKeysCallExpression(
  node: ts.Node,
  typeChecker: ts.TypeChecker,
  needleName: string,
  tsPath: string,
): node is ts.CallExpression {

  if (! ts.isCallExpression(node)) {
    return false
  }
  const sign = typeChecker.getResolvedSignature(node)
  if (! sign) {
    return false
  }
  const { declaration } = sign
  if (! declaration || ts.isJSDocSignature(declaration)) {
    return false
  }
  else {
    const txt = declaration.name ? declaration.name.getText() : ''
    if (txt && txt !== needleName) {
      return false
    }
  }

  try {
    // require.resolve is required to resolve symlink.
    // https://github.com/kimamula/ts-transformer-keys/issues/4#issuecomment-643734716
    const filename = declaration.getSourceFile().fileName
    const path = require.resolve(filename)
    // console.log({ path, tsPath })
    return path === tsPath
  }
  catch (ex) {
    // declaration.getSourceFile().fileName may not be in Node.js require stack and require.resolve may result in an error.
    // https://github.com/kimamula/ts-transformer-keys/issues/47
    return false
  }
}
