/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript'

import { createSourceFile } from '../ts-morph/common'
import {
  TransFormOptions,
  TransformCallExpressionToLiteralTypeRet,
  transformCallExpressionToLiteralType,
} from '../ts-morph/tpl-literal'
import {
  createObjectLiteralExpression,
  isKeysCallExpression,
  isKeysImportExpression,
  processImportDeclaration,
} from '../ts/common'

import {
  genTransformerFactor,
  GenTransformerFactorOpts,
  VisitNodeOpts,
} from './common'


export interface TransTypetoLiteralObjOpts {
  needle: string
  resultType: string
  importModuleName?: string
  leadingString: string
  trailingString: string
  tsConfigFilePath: string
  jsPath: string
  tsPath: string
}

interface VOpts extends VisitNodeOpts, TransTypetoLiteralObjOpts {
  literalRetMap: TransformCallExpressionToLiteralTypeRet
}

export function transTypetoLiteralObj(
  program: ts.Program,
  options: TransTypetoLiteralObjOpts,
): ts.TransformerFactory<ts.SourceFile> {

  const visitNodeOpts: VOpts = {
    program,
    literalRetMap: new Map() as TransformCallExpressionToLiteralTypeRet,
    ...options,
  }
  const opts: GenTransformerFactorOpts<VOpts> = {
    visitNodeHandler: visitNode,
    visitNodeOpts,
  }
  const transfactory = genTransformerFactor<VOpts>(opts)
  return transfactory
}


function visitNode(node: ts.SourceFile, options: VOpts): ts.SourceFile
function visitNode(node: ts.Node, options: VOpts): ts.Node | undefined
function visitNode(node: ts.Node, options: VOpts): ts.Node | undefined {
  if (ts.isSourceFile(node)) {
    if (! options.literalRetMap.size) {
      const path = node.fileName
      const file = createSourceFile(options.tsConfigFilePath, path)
      const opts: TransFormOptions = {
        sourceFile: file,
        importModuleName: options.importModuleName,
        needle: options.needle,
        resultType: options.resultType,
        leadingString: options.leadingString,
        trailingString: options.trailingString,
      }
      const retMap = transformCallExpressionToLiteralType(opts)
      options.literalRetMap = retMap
    }
    return node
  }

  const typeChecker = options.program.getTypeChecker()
  /* istanbul ignore else */
  if (isKeysImportExpression(node, options.jsPath, options.tsPath)) {
    const nodeDecl = processImportDeclaration(node, [options.needle])
    return nodeDecl
  }
  if (! isKeysCallExpression(node, typeChecker, options.needle, options.tsPath)) {
    return node
  }
  if (! node.typeArguments || ! node.typeArguments.length) {
    return ts.factory.createArrayLiteralExpression([])
  }

  const pNode = node.parent
  if (pNode.kind === ts.SyntaxKind.VariableDeclaration) {
    const sym = typeChecker.getSymbolAtLocation(pNode)
    // @ts-expect-error
    const { symbol }: { symbol: ts.Symbol | undefined } = pNode
    const pNodeName = sym
      ? sym.getName()
      : symbol ? symbol.getName() : ''
    const literalObj = options.literalRetMap.get(pNodeName)
    if (! literalObj) { return node }

    const newNode = createObjectLiteralExpression(literalObj)
    ts.addSyntheticLeadingComment(
      newNode,
      ts.SyntaxKind.MultiLineCommentTrivia,
      `${options.leadingString} `,
    )
    ts.addSyntheticTrailingComment(
      newNode,
      ts.SyntaxKind.MultiLineCommentTrivia,
      ` ${options.trailingString}`,
    )
    return newNode
  }

  return node
}

