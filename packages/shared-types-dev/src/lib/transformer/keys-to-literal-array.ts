/* eslint-disable max-len */
import {
  join,
  pathResolve,
  dirname,
} from '@waiting/shared-core'
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript'

import { processImportDeclaration } from '../ts/common'


const fileName = 'keys-to-literal-array'
const placeholderName = 'transTypeKeystoLiteralArrayPlaceholder'
const indexJs = join(__dirname, 'index.cjs.js')
const indexTs = join(__dirname, `${fileName}.ts`)

/**
 * A ts.TransformerFactory generator,
 * transform call expression
 * ```ts
 *   const keys = transTypeKeystoLiteralArrayPlaceholder<GTypes>()
 * ```
 * to literal array from generics type arguemnt of the GTypes,
 * such as
 * ```ts
 *   const keys = ["foo", "bar"]
 * ```
 *
 * @description based on https://www.npmjs.com/package/ts-transformer-keys
 */
export function transTypeKeystoLiteralArray(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
    const ret = visitNodeAndChildren(file, program, context)
    return ret
  }
}

function visitNodeAndChildren(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined {
  const visitor = (childNode: ts.Node) => visitNodeAndChildren(childNode, program, context)
  const visitRet = ts.visitEachChild(
    visitNode(node, program),
    visitor,
    context,
  )
  return visitRet
}

function visitNode(node: ts.SourceFile, program: ts.Program): ts.SourceFile
function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined
function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined {
  const typeChecker = program.getTypeChecker()
  if (isKeysImportExpression(node)) {
    const nodeDecl = processImportDeclaration(node, [placeholderName])
    return nodeDecl
  }
  if (! isKeysCallExpression(node, typeChecker, placeholderName)) {
    return node
  }
  if (! node.typeArguments || ! node.typeArguments.length) {
    return ts.factory.createArrayLiteralExpression([])
  }
  const [firstTypeArg] = node.typeArguments
  if (! firstTypeArg) {
    throw new TypeError('typeArguents empty')
  }
  const type = typeChecker.getTypeFromTypeNode(firstTypeArg)
  const properties = typeChecker.getPropertiesOfType(type)
  const arr = properties.map(property => ts.factory.createStringLiteral(property.name))
  const express = ts.factory.createArrayLiteralExpression(arr, false)
  return express
}

function isKeysImportExpression(node: ts.Node): node is ts.ImportDeclaration {
  if (! ts.isImportDeclaration(node)) {
    return false
  }
  const module = (node.moduleSpecifier as ts.StringLiteral).text // not getText()
  // console.info({ module })
  try {
    if (module.startsWith('.')) {
      const resolvedPath = pathResolve(dirname(node.getSourceFile().fileName), module)
      const path = require.resolve(resolvedPath)
      // console.info({
      //   module, indexJs, indexTs, fulpath: path,
      // })
      return path === indexJs || path === indexTs
    }
    else {
      const path = require.resolve(module)
      return path === indexJs
    }
  }
  catch (ex) {
    return false
  }
}

function isKeysCallExpression(
  node: ts.Node,
  typeChecker: ts.TypeChecker,
  needleName: string,
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
    return path === indexTs
  }
  catch (ex) {
    // declaration.getSourceFile().fileName may not be in Node.js require stack and require.resolve may result in an error.
    // https://github.com/kimamula/ts-transformer-keys/issues/47
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transTypeKeystoLiteralArrayPlaceholder<T extends Record<string, any>>(): (keyof T)[] {
  return {} as (keyof T)[]
}
