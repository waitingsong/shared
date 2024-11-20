import assert from 'node:assert'

import type { CallerInfo } from '##/index.js'
import { getCallerStack } from '##/lib/callstack/util.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  describe('should getStackCallerSites work ', () => {
    it('normal', () => {
      const exact = false
      const callerInfo = getCallerStack(0, exact)
      validateInfo(callerInfo, import.meta.url, exact)
      assert(callerInfo.funcName === '', `expect empty, but got ${callerInfo.funcName}`)
    })

    it('retrievePosition: true', () => {
      const exact = true
      const callerInfo = getCallerStack(0, exact)
      validateInfo(callerInfo, import.meta.url, exact)
      assert(callerInfo.funcName === '', `expect empty, but got ${callerInfo.funcName}`)
    })

    it('distance: 1', () => case31) // line24
  })
})

function demo() {
  const callerInfo = getCallerStack(1, true)
  validateInfo(callerInfo, import.meta.url, true)
  assert(callerInfo.line === 25, JSON.stringify(callerInfo, null, 2))
  assert(callerInfo.column === 7, JSON.stringify(callerInfo, null, 2))
  assert(callerInfo.funcName === 'case31', JSON.stringify(callerInfo, null, 2))
  assert(callerInfo.className === '', JSON.stringify(callerInfo, null, 2))
  assert(callerInfo.lineNumber === 24, JSON.stringify(callerInfo, null, 2))
  assert(callerInfo.columnNumber === 24, JSON.stringify(callerInfo, null, 2))
}
function case31(): void {
  demo()
}

function validateInfo(callerInfo: CallerInfo, path: string, exact: boolean): void {
  assert(callerInfo)
  if (path) {
    assert(callerInfo.path.includes(path), `expect ${path}, but got ${callerInfo.path}`)
    assert(callerInfo.fileName.includes(path), `expect ${path}, but got ${callerInfo.fileName}`)
  }

  assert(callerInfo.lineNumber)
  assert(callerInfo.columnNumber)

  if (exact) {
    assert(callerInfo.line > 0, `expect > 0, but got ${callerInfo.line}`)
    assert(callerInfo.column > 0, `expect > 0, but got ${callerInfo.column}`)
  }
  else {
    assert(callerInfo.line === -1, `expect -1, but got ${callerInfo.line}`)
    assert(callerInfo.column === -1, `expect -1, but got ${callerInfo.column}`)
  }
}
