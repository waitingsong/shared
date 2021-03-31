/* eslint-disable max-len */
import { join } from '@waiting/shared-core'
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript'

import { baseDir } from '../../base'
import {
  isKeysCallExpression,
  isKeysImportExpression,
  processImportDeclaration,
} from '../ts/common'

import { genTransformerFactor, GenTransformerFactorOpts, VisitNodeOpts } from './common'


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
  const visitNodeOpts: VisitNodeOpts = {
    jsPath: indexJs,
    tsPath: indexTs,
    needle: placeholderName,
    program,
  }
  const options: GenTransformerFactorOpts<VisitNodeOpts> = {
    visitNodeHandler: visitNode,
    visitNodeOpts,
  }
  const transfactory = genTransformerFactor<VisitNodeOpts>(options)
  return transfactory
}


function visitNode(node: ts.SourceFile, options: VisitNodeOpts): ts.SourceFile
function visitNode(node: ts.Node, options: VisitNodeOpts): ts.Node | undefined
function visitNode(node: ts.Node, options: VisitNodeOpts): ts.Node | undefined {
  const typeChecker = options.program.getTypeChecker()
  /* istanbul ignore else */
  if (isKeysImportExpression(node, options.jsPath, options.tsPath)) {
    const nodeDecl = processImportDeclaration(node, [options.needle])
    return nodeDecl
  }
  else if (! isKeysCallExpression(node, typeChecker, options.needle, options.tsPath)) {
    return node
  }
  else if (! node.typeArguments || ! node.typeArguments.length) {
    return ts.factory.createArrayLiteralExpression([])
  }

  const [firstTypeArg] = node.typeArguments
  /* istanbul ignore else */
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

