/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript'


export interface GenTransformerFactorOpts<T extends VisitNodeOpts> {
  visitNodeHandler: VisitNodeHandler<T>
  visitNodeOpts: T
}

export interface VisitNodeOpts {
  jsPath: string
  tsPath: string
  needle: string
  program: ts.Program
}
export type VisitNodeHandler<T extends VisitNodeOpts> =
  (node: ts.SourceFile | ts.Node, options: T) => ts.SourceFile | ts.Node | undefined

/**
 * A ts.TransformerFactory generator,
 * generating ts.TransformerFactory
 */
export function genTransformerFactor<T extends VisitNodeOpts>(
  options: GenTransformerFactorOpts<T>,
): ts.TransformerFactory<ts.SourceFile> {

  return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
    const ret = visitNodeAndChildren<T>(file, context, options)
    return ret
  }
}

function visitNodeAndChildren<T extends VisitNodeOpts>(
  node: ts.SourceFile, context: ts.TransformationContext, options: GenTransformerFactorOpts<T>
): ts.SourceFile
function visitNodeAndChildren<T extends VisitNodeOpts>(
  node: ts.Node, context: ts.TransformationContext, options: GenTransformerFactorOpts<T>
): ts.Node | undefined
function visitNodeAndChildren<T extends VisitNodeOpts>(
  node: ts.Node,
  context: ts.TransformationContext,
  options: GenTransformerFactorOpts<T>,
): ts.Node | undefined {

  const visitor = (childNode: ts.Node) => visitNodeAndChildren<T>(childNode, context, options)
  const visitRet = ts.visitEachChild(
    options.visitNodeHandler(node, options.visitNodeOpts),
    visitor,
    context,
  )
  return visitRet
}

