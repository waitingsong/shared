/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import assert from 'node:assert/strict'
import { normalize } from 'node:path'
import util from 'node:util'

import semver from 'semver'
// import { install } from 'source-map-support'

import type { CallerInfo, CallerInfoBase } from './types.js'


const maxStackDepth = 128

const initInfoBase: CallerInfoBase = {
  path: '',
  line: -1,
  column: -1,
}

const initInfo: CallerInfo = {
  path: '',
  srcPath: '',
  line: -1,
  column: -1,
  fileName: '',
  funcName: '',
  methodName: '',
  className: '',
  lineNumber: -1,
  columnNumber: -1,
  /** @deprecated since nodejs v22.9 */
  enclosingLineNumber: -1,
  /** @deprecated since nodejs v22.9 */
  enclosingColNumber: -1,
}

const nodeVersion = semver.coerce(process.version)
const isNodeGteV20 = nodeVersion ? semver.gte(nodeVersion, '20.0.0') : false

/**
 * Nodejs execution options
 * @description from process.execArgv and process.evn.NODE_OPTIONS
 * @example return new Set(['--loader ts-node/esm', '--no-warnings'])
 */
export function retrieveNodeExecOptions(): Set<string> {
  const ret = new Set<string>(process.execArgv)

  const line = process.env['NODE_OPTIONS'] ?? ''
  const opts = line.trim()
  //  opts: ' --loader ts-node/esm  --no-warnings '
  opts.split(/(?=--)/u).forEach((opt) => {
    const txt = opt.trim()
    if (txt.startsWith('--')) {
      ret.add(txt.replace(/\s{2,}/ug, ' '))
    }
  })

  return ret
}

export function isExecWithEnableSourceMaps(): boolean {
  const opts = retrieveNodeExecOptions()
  const ret = opts.has('--enable-source-maps')
  return ret
}

/**
 * the dep "source-map-support" should be installed
 */
export function getCallerStack(
  callerDistance = 0,
  /**
   * If true, then callerInfo.line and callerInfo.column will be retrieved
   */
  retrievePosition = false,
): CallerInfo {

  const info = getCallerStackSimpleInfo(callerDistance + 1)

  if (! retrievePosition) {
    return info
  }

  const stack = getStack()
  if (! stack.length) {
    return info
  }
  const depth = callerDistance + 1
  const arr = stack.split('\n')
  const line2 = arr[depth + 1]
  assert(line2, 'Retrieve stack of caller failed, line empty.')
  const infoBase = retrieveInfoPathWithLineCol(line2)
  const srcPath = infoBase.path && ! infoBase.path.startsWith('file:///')
    ? 'file:///' + normalize(infoBase.path).replace(/\\/ug, '/')
    : infoBase.path
  const caller: CallerInfo = {
    ...info,
    line: infoBase.line,
    column: infoBase.column,
    srcPath,
  }

  if (isNodeGteV20 && ! isExecWithEnableSourceMaps()) {
    const str = caller.path.toLowerCase()
    if (str.endsWith('.ts') || str.endsWith('.mts')) {
      if (caller.line === caller.lineNumber && caller.column === caller.columnNumber) {
        console.warn(`Warning getCallerStack(): Nodejs >= 20.0.0, but not exec with --enable-source-maps. return line and column may incorrect. \n  file: "${caller.path}"`)
      }
    }
  }

  return caller
}

/**
 * @link https://github.com/nodejs/node/releases/tag/v22.9.0
 */
interface CallerInfoOrigin {
  functionName: string
  scriptName: string
  lineNumber: number
  column: number
}

/**
 * Get stack string, line/colum number not transformed with source-map
 */
function getCallerStackSimpleInfo(callerDistance = 0): CallerInfo {
  const depth = callerDistance + 1

  // @link https://github.com/nodejs/node/releases/tag/v22.9.0
  // @ts-ignore since node v22.9
  if (typeof util.getCallSite === 'function') {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const callSites: CallerInfoOrigin[] = util.getCallSite(depth + 1)
    const site = callSites[depth]
    assert(site, 'stack empty')

    const info: CallerInfo = {
      ...initInfo,
      path: site.scriptName,
      fileName: site.scriptName,
      className: '',
      funcName: '',
      methodName: '',
      lineNumber: site.lineNumber,
      columnNumber: site.column,
      enclosingLineNumber: -1,
      enclosingColNumber: -1,
    }
    return info
  }

  const stacks = getStackCallerSites(depth + 1)
  const site = stacks[depth]
  assert(site, 'stack empty')

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const enclosingLineNumber: number | undefined = site.getEnclosingLineNumber
    ? site.getEnclosingLineNumber() as unknown as number
    : 0

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const enclosingColNumber: number | undefined = site.getEnclosingColumnNumber
    ? site.getEnclosingColumnNumber() as unknown as number
    : 0

  const funcName = site.getFunctionName() ?? ''
  const methodName = site.getMethodName() ?? ''
  const typeName = site.getTypeName() ?? ''

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const line = site.toString()

  let className = typeName
  if (! className) {
    className = methodName
      ? line.match(new RegExp(`\\b\\S+(?=\\.${methodName})`, 'u'))?.[0] ?? ''
      : ''
    if (! className && methodName !== funcName) {
      className = funcName
        ? line.match(new RegExp(`\\b\\S+(?=\\.${funcName})`, 'u'))?.[0] ?? ''
        : ''
    }
  }

  const fileLine = site.getFileName()

  const info: CallerInfo = {
    ...initInfo,
    path: fileLine ?? '',
    fileName: site.getFileName() ?? '',
    className,
    funcName,
    methodName,
    lineNumber: site.getLineNumber() ?? 0,
    columnNumber: site.getColumnNumber() ?? 0,
    enclosingLineNumber,
    enclosingColNumber,
  }

  return info
}


/**
 * Get stack string, line/colum number transformed with source-map
 * @see https://stackoverflow.com/a/13227808
 */
export function getStack(): string {
  const ret = isNodeGteV20
    ? getStackCurrent()
    : getStackOld()
  return ret
}

/**
 * For node < v20
 */
function getStackOld(): string {
  const _prepareStackTrace = Error.prepareStackTrace
  const sites = getStackCallerSites(maxStackDepth).slice(2)

  if (_prepareStackTrace && sites.length) {
    const stack = _prepareStackTrace(new Error(), sites) as string
    return stack
  }

  return ''
}

/**
 * For node >= v20
 */
function getStackCurrent(): string {
  const err = new Error()
  const { stack } = err
  assert(stack, 'stack EMPTY!')

  const arr = stack.split('\n')
  const arr2 = arr.slice(0, 1).concat(arr.slice(3))
  const line = arr2[1]
  const { path } = retrieveInfoPathWithLineCol(line ?? '')
  if (path.endsWith('.ts') || path.endsWith('.mts')) {
    if (isNodeGteV20 && ! isExecWithEnableSourceMaps()) {
      console.warn(`Warning getCallerStack(): Nodejs >= 20.0.0, but not exec with --enable-source-maps. return line and column may incorrect.
  file: "${line ?? path}"`)
    }
  }
  // const sites = callsites()
  // assert(sites?.length > 0, 'callsites() empty'
  // console.info({ sites })
  // const site1 = sites[1]
  // const site2 = sites[2]
  // const site3 = sites[3]

  // const info1 = {
  //   path: site1.ge,
  // }

  // console.log({

  // })

  const ret = arr2.join('\n')
  return ret
}



export function getStackCallerSites(stackTraceLimit = 10): NodeJS.CallSite[] {
  const _prepareStackTrace = Error.prepareStackTrace
  const limit = Error.stackTraceLimit

  // if (! _prepareStackTrace) {
  //   install()
  // }

  Error.prepareStackTrace = function (_: Error, structuredStackTrace: NodeJS.CallSite[]): NodeJS.CallSite[] {
    const target = structuredStackTrace.slice(1)
    return target
  }
  Error.stackTraceLimit = stackTraceLimit >= 0 ? stackTraceLimit + 1 : 11

  const err = new Error()
  const stacks = err.stack as NodeJS.CallSite[] | undefined

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = _prepareStackTrace
  Error.stackTraceLimit = limit

  assert(stacks, 'stacks EMPTY!')
  return stacks
}

function retrievePathWithLineCol(line: string): string {
  let path = ''
  if (line.includes('(')) {
    // "    at Object.<anonymous> (...\\30.caller-stack.test.ts:20:20)"
    // "    at Object.test1 (...\\call-config.ts:6:22)"
    path = line.slice(line.indexOf('(') + 1, -1)
  }
  else if (line.startsWith('file://')) {
    path = line
  }
  else if (/^\s*at .+?\d+:\d+$/u.test(line)) {
    // "    at ...\\call-config.ts:24:12"
    const txt = line.slice(line.indexOf('at') + 3)
    const last = txt.slice(-1)
    path = typeof +last === 'number'
      ? txt
      : txt.slice(0, -1)
    // console.log('debug01', { path, line })
  }
  else {
    throw new Error('Retrieve stack of caller failed. ' + line)
  }

  if (! path) {
    throw new Error('Retrieve stack of caller failed')
  }

  return path
}

function retrieveInfoPathWithLineCol(line: string): CallerInfoBase {
  const ret: CallerInfoBase = {
    ...initInfoBase,
  }

  const path = retrievePathWithLineCol(line)
  const matched2 = /^(.+):(\d+):(\d+)$/u.exec(path)
  if (! matched2 || matched2.length !== 4) {
    throw new Error('Retrieve stack of caller failed. ' + (matched2 ? matched2.toString() : ''))
  }

  const [, m1, m2, m3] = matched2
  assert(m1, 'path EMPTY!')
  assert(m2 && m3, 'line or column EMPTY!' + matched2.toString())
  ret.path = m1.trim()
  ret.line = +m2
  ret.column = +m3

  return ret
}
