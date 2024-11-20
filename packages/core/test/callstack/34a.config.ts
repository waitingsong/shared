import assert from 'node:assert'

import type { CallerInfo } from '##/index.js'
import { getCallerInfo } from '##/lib/callstack/util.js'


// line order of callings is important

export function _demo(distance = 0) { // line9
  const callerInfo = getCallerInfo(distance + 1)
  return callerInfo
}

export class Foo {
  foo() {
    return getCallerInfo(0)
  }

  bar() {
    return getCallerInfo(1)
  }

  barz() {
    return this.bar()
  }
}

export function validateInfo(callerInfo: CallerInfo, path: string): void {
  assert(callerInfo)
  if (path) {
    assert(callerInfo.path.includes(path), `expect ${path}, but got ${callerInfo.path}`)
    assert(callerInfo.fileName.includes(path), `expect ${path}, but got ${callerInfo.fileName}`)
  }

  assert(callerInfo.lineNumber)
  assert(callerInfo.columnNumber)
}
