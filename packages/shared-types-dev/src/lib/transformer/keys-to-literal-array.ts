/* eslint-disable max-len */
import {
  join,
} from '@waiting/shared-core'
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript'

import { baseDir } from '../../base'
import {
  isKeysCallExpression,
  isKeysImportExpression,
  processImportDeclaration,
} from '../ts/common'


const _fileName = 'src/lib/transformer/keys-to-literal-array'
const placeholderName = 'transTypeKeystoLiteralArrayPlaceholder'
const indexJs = join(baseDir, 'dist/index.cjs.js')
const indexTs = join(baseDir, `${_fileName}.ts`)

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
  if (isKeysImportExpression(node, indexJs, indexTs)) {
    const nodeDecl = processImportDeclaration(node, [placeholderName])
    return nodeDecl
  }
  if (! isKeysCallExpression(node, typeChecker, placeholderName, indexTs)) {
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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transTypeKeystoLiteralArrayPlaceholder<T extends Record<string, any>>(): (keyof T)[] {
  return {} as (keyof T)[]
}

