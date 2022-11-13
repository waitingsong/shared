import assert from 'node:assert/strict'


import { getCallerStack } from '../../src/lib/callstack/util.js'
import { fileShortPath } from '../../src/lib/helper.js'

import { CallerInfo } from '~/index.js'


describe(fileShortPath(import.meta.url), () => {
  describe('should getStackCallerSites work ', () => {
    it('normal', () => {
      const exact = false
      const callerInfo = getCallerStack(0, exact)
      validateInfo(callerInfo, exact)
    })

    it('retrievePosition: true', () => {
      const exact = true
      const callerInfo = getCallerStack(0, exact)
      validateInfo(callerInfo, exact)
    })
  })
})

function validateInfo(callerInfo: CallerInfo, exact: boolean): void {
  assert(callerInfo)
  const str1 = import.meta.url
  assert(callerInfo.path === str1)
  assert(callerInfo.fileName === str1)

  assert(callerInfo.lineNumber)
  assert(callerInfo.columnNumber)

  if (exact) {
    assert(callerInfo.line > 0)
    assert(callerInfo.column > 0)
  }
  else {
    assert(callerInfo.line === -1)
    assert(callerInfo.column === -1)
  }
}
