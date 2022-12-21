/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { findSourceMap, SourceMap } from 'module'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import assert from 'node:assert/strict'

import { install } from 'source-map-support'

import { CallerInfo } from './types.js'


const initInfo: CallerInfo = {
  path: '',
  line: -1,
  column: -1,
  fileName: '',
  funcName: '',
  methodName: '',
  className: '',
  lineNumber: -1,
  columnNumber: -1,
  enclosingLineNumber: -1,
  enclosingColNumber: -1,
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

  const depth = callerDistance + 1
  const stacks = getStackCallerSites(depth + 1)
  const site = stacks[depth]
  assert(site, 'stack empty')

  // @ts-expect-error
  const enclosingLineNumber: number | undefined = site.getEnclosingLineNumber
    // @ts-expect-error
    ? site.getEnclosingLineNumber() as unknown as number
    : 0

  // @ts-expect-error
  const enclosingColNumber: number | undefined = site.getEnclosingColumnNumber
    // @ts-expect-error
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
    if (! className && (methodName !== funcName)) {
      className = funcName
        ? line.match(new RegExp(`\\b\\S+(?=\\.${funcName})`, 'u'))?.[0] ?? ''
        : ''
    }
  }

  const fileLine = retrievePath(line)
  const matched = /^(.+):(\d+):(\d+)$/u.exec(fileLine)
  if (! matched || matched.length !== 4) {
    console.warn({ line, fileLine, matched })
    throw new Error('Retrieve args forme caller line failed. ')
  }
  const [, p1] = matched

  const info: CallerInfo = {
    ...initInfo,
    path: p1?.trim() ?? '',
    fileName: site.getFileName() ?? '',
    className,
    funcName,
    methodName,
    lineNumber: site.getLineNumber() ?? 0,
    columnNumber: site.getColumnNumber() ?? 0,
    enclosingLineNumber,
    enclosingColNumber,
  }
  if (! retrievePosition) {
    return info
  }

  const stack = Error.prepareStackTrace?.(new Error(), [site]) as string | undefined
  if (! stack) {
    return info
  }
  // const stack = getStack()
  const arr = stack.split('\n')
  // const [line2] = arr.slice(depth + 1, depth + 2)
  const line2 = arr[1]

  if (! line2) {
    throw new Error('Retrieve stack of caller failed, line empty.')
  }
  const path = retrievePath(line2)
  const matched2 = /^(.+):(\d+):(\d+)$/u.exec(path)
  if (! matched2 || matched2.length !== 4) {
    throw new Error('Retrieve stack of caller failed. ' + (matched2 ? matched2.toString() : ''))
  }

  const [, , m2, m3] = matched2
  if (! m2 || ! m3) {
    throw new Error('Retrieved stack of caller empty. ' + matched2.toString())
  }
  const caller: CallerInfo = {
    ...info,
    line: +m2,
    column: +m3,
  }

  return caller
}

/**
 * Get stack string
 * @see https://stackoverflow.com/a/13227808
 */
export function getStack(): string {
  // Save original Error.prepareStackTrace
  let origPrepareStackTrace = Error.prepareStackTrace

  /* istanbul ignore else */
  if (! origPrepareStackTrace) {
    // MUST installing inner getStack()
    install()

    /* istanbul ignore else */
    if (! Error.prepareStackTrace) {
      throw new Error('Error.prepareStackTrace not defined')
    }
    origPrepareStackTrace = Error.prepareStackTrace
  }
  // void else in debug hooked by source-map-support already

  Error.prepareStackTrace = function(err: Error, structuredStackTrace: NodeJS.CallSite[]): string {
    const target = structuredStackTrace.slice(1)
    // @ts-expect-error
    const ret = origPrepareStackTrace(err, target) as string
    return ret
  }

  const limit = Error.stackTraceLimit
  // Error.stackTraceLimit = depth + 2

  const err = new Error()
  const { stack } = err

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace
  Error.stackTraceLimit = limit

  if (! stack) {
    throw new Error('stack EMPTY!')
  }

  return stack
}


export function getStackCallerSites(stackTraceLimit = 10): NodeJS.CallSite[] {
  // Save original Error.prepareStackTrace
  let origPrepareStackTrace = Error.prepareStackTrace

  /* c8 ignore else */
  if (! origPrepareStackTrace) {
    /* c8 ignore else */
    if (! Error.prepareStackTrace) {
      throw new Error('Error.prepareStackTrace not defined')
    }
    origPrepareStackTrace = Error.prepareStackTrace
  }
  // void else in debug hooked by source-map-support already

  Error.prepareStackTrace = function(_: Error, structuredStackTrace: NodeJS.CallSite[]): NodeJS.CallSite[] {
    const target = structuredStackTrace.slice(1)
    return target
  }

  const limit = Error.stackTraceLimit
  Error.stackTraceLimit = stackTraceLimit >= 0 ? stackTraceLimit + 1 : 11

  const err = new Error()
  const stacks = err.stack as NodeJS.CallSite[] | undefined

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace
  Error.stackTraceLimit = limit

  if (! stacks) {
    throw new Error('stacks EMPTY!')
  }

  return stacks
}

function retrievePath(line: string): string {
  let path = ''
  if (line.includes('(')) {
    // "    at Object.<anonymous> (...\\30.caller-stack.test.ts:20:20)"
    // "    at Object.test1 (...\\call-config.ts:6:22)"
    path = line.slice(line.indexOf('(') + 1, -1)
  }
  else if (line.includes('at')) {
    // "    at ...\\call-config.ts:24:12"
    path = line.slice(line.indexOf('at') + 3, -1)
  }
  else if (line.startsWith('file://')) {
    path = line
  }
  else {
    throw new Error('Retrieve stack of caller failed. ' + line)
  }

  if (! path) {
    throw new Error('Retrieve stack of caller failed')
  }

  return path
}
