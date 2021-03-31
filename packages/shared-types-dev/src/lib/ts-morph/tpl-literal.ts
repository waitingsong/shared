/* eslint-disable @typescript-eslint/ban-types */
import { LiteralObject } from '@waiting/shared-types'
import {
  ts,
  Identifier,
  SourceFile,
  TypeAliasDeclaration,
  CallExpression,
} from 'ts-morph'

import { deepFind } from '../util'

import {
  findCallExpressionsByName,
  hasImportNecessaryType,
  retrieveFirstTypeArgTextFromCallExpression,
  retrieveVarnameFromCallExpression,
} from './common'


const props = {
  configurable: false,
  enumerable: true,
  writable: true,
}

export interface TransFormOptions {
  sourceFile: SourceFile
  needle: string
  resultType: string
  importModuleName?: string
  leadingString: string
  trailingString: string
}

export interface ProcessExpressionOptions {
  file: SourceFile
  express: CallExpression<ts.CallExpression>
  needle: TransFormOptions['needle']
  resultType: string
}
export type TransformCallExpressionToLiteralTypeRet = Map<string, LiteralObject>

/**
 * @returns Map<varname, computer object>
 */
export function transformCallExpressionToLiteralType(
  options: TransFormOptions,
): TransformCallExpressionToLiteralTypeRet {

  const {
    sourceFile,
    needle,
    resultType,
    importModuleName,
    leadingString,
    trailingString,
  } = options
  const ret = new Map<string, LiteralObject>()

  const insertedNum = importModuleName
    ? hasImportNecessaryType(sourceFile, [resultType], importModuleName)
    : 0

  const expressions = findCallExpressionsByName(sourceFile, needle)
  expressions.forEach((express) => {
    const opts: ProcessExpressionOptions = {
      file: sourceFile,
      express,
      needle,
      resultType,
    }
    const varname = retrieveVarnameFromCallExpression(express)
    const obj = genLiteralObjectFromExpression(opts)
    ret.set(varname, obj)

    const jsonCode = `/* ${leadingString} */ `
      + JSON.stringify(obj, null, 2)
      + ` /* ${trailingString} */`
    express.replaceWithText(jsonCode)
  })

  if (insertedNum > 0) {
    sourceFile.removeStatements([0, insertedNum])
  }

  // const ft2 = sourceFile.getFullText()
  // if (saveFile) {
  //   sourceFile.saveSync()
  // }

  return ret
}

export function genLiteralObjectFromExpression(
  options: ProcessExpressionOptions,
): LiteralObject {

  const {
    file,
    express,
    needle,
    resultType,
  } = options

  const ret = {}
  const doName = retrieveFirstTypeArgTextFromCallExpression(express)

  if (! doName) {
    // throw new Error(`Parameter D of ${AstKey.genDbDict}<D>() missing`)
    throw new Error(`Parameter D of ${needle}<D>() missing`)
  }

  const aliasName = 'T' + Math.random().toString().slice(-5)

  file.addStatements(`type ${aliasName} = ${resultType}<${doName}>`)
  // const ft = file.getFullText()
  const aliasDec = file.getTypeAlias(aliasName)
  if (aliasDec) {
    genTypeAliasDeclaration(ret, file, aliasDec)
    aliasDec.remove()
  }

  // const text = express.getText()
  const node = express.getParent()
  return node ? ret : {}
}


export function genTypeAliasDeclaration(
  resultObj: object,
  file: SourceFile,
  typeAliasDecla: TypeAliasDeclaration,
  delimiter = '_oo_',
): void {

  const parentIdentifier: Identifier = typeAliasDecla.getNameNode()
  const pidName = parentIdentifier.getText()
  const arr = pidName.split(delimiter)
  const pidPath = arr.length > 1 ? arr.slice(1) : []
  const tt = parentIdentifier.getType()
  const literalValue = tt.getLiteralValue()

  if (literalValue) {
    const tmpObj = pidPath.length ? deepFind(resultObj, pidPath.slice(0, -1)) : resultObj
    if (typeof tmpObj !== 'object') {
      throw new TypeError(`Value of resultObje "${pidPath.join('.')} is not object"`)
    }
    const propKey = pidPath.length > 1 ? pidPath.slice(-1)[0] : ''
    if (! propKey) {
      throw new TypeError('propKey empty')
    }
    Object.defineProperty(tmpObj, propKey, {
      ...props,
      value: literalValue,
    })
    typeAliasDecla.remove()
    return
  }

  const typeProps = tt.getProperties()

  if (! typeProps.length) {
    const text2 = tt.getText() // 'ScopedTableFields<"tb_user", "uid" | "name">'
    throw new TypeError(`type "${text2}" has no properties,
      pidName: "${pidName}",
      pidPath: "${pidPath.join('.')}".
      May TransFormOptions['importModuleName'] empty
      `)
  }

  for (const prop of typeProps) {
    const propKey = prop.getName()
    if (! propKey) {
      continue
    }
    const typeKey = `${pidName}${delimiter}${propKey}`
    const code = `type ${typeKey} = ${pidName}['${propKey}']`
    file.addStatements(code)
    // console.log({ typeKey, code })
    const decla = file.getTypeAlias(typeKey)
    if (! decla) {
      throw new TypeError(`Declaraion ${typeKey} not exists`)
    }
    // const id = decla.getNameNode()
    // const text = id.getText()
    const tmpObj = pidPath.length ? deepFind(resultObj, pidPath) : resultObj
    if (typeof tmpObj !== 'object') {
      throw new TypeError(`Value of resultObje "${pidPath.join('.')} is not object"`)
    }
    Object.defineProperty(tmpObj, propKey, {
      ...props,
      value: {},
    })
    genTypeAliasDeclaration(resultObj, file, decla, delimiter)
  }

  if (arr.length > 1) {
    typeAliasDecla.remove()
  }
  return
}

