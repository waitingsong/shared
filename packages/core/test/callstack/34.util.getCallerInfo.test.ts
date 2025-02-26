import assert from 'node:assert'

import { getCallerInfo } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'
import { isNodeGteV22_13, isNodeGteV23 } from '#@/root.config.js'

import { demo } from './34.demo1.js'
import { demo2 } from './34.demo2.js'
import { _demo, validateInfo } from './34a.config.js'


describe(fileShortPath(import.meta.url), () => {


  describe('getCallerInfo() ', () => {
    it('distance: 0', () => {
      const info = getCallerInfo(0)
      validateInfo(info, import.meta.url)
      assert(info.funcName === '', `expect blank, but got ${info.funcName}`)
    })

    it('distance: 1', () => {
      const info = _demo() // line23
      validateInfo(info, import.meta.url)
      assert(info.line === -1, JSON.stringify(info, null, 2))
      assert(info.column === -1, JSON.stringify(info, null, 2))
      assert(info.funcName === '', JSON.stringify(info, null, 2))
      assert(info.methodName === '', JSON.stringify(info, null, 2))
      assert(info.className === 'Context', JSON.stringify(info, null, 2))
      if (isNodeGteV23 || isNodeGteV22_13) {
        assert(info.lineNumber === 23, JSON.stringify(info, null, 2))
        assert(info.columnNumber === 20, JSON.stringify(info, null, 2))
      }
      else {
        assert(info.lineNumber === 16, JSON.stringify(info, null, 2))
        assert(info.columnNumber === 26, JSON.stringify(info, null, 2))
      }
    })

    it('demo', () => {
      const info = demo()
      validateInfo(info, 'test/callstack/34.util.getCallerInfo.test.ts')
      assert(info.line === -1, JSON.stringify(info, null, 2))
      assert(info.column === -1, JSON.stringify(info, null, 2))
      assert(info.funcName === '', JSON.stringify(info, null, 2))
      assert(info.methodName === '', JSON.stringify(info, null, 2))
      assert(info.className === 'Context', JSON.stringify(info, null, 2))
      if (isNodeGteV23 || isNodeGteV22_13) {
        assert(info.lineNumber === 41, JSON.stringify(info, null, 2))
        assert(info.columnNumber === 20, JSON.stringify(info, null, 2))
      }
      else {
        assert(info.lineNumber === 33, JSON.stringify(info, null, 2))
        assert(info.columnNumber === 26, JSON.stringify(info, null, 2))

      }
    })

    it('demo2', case22)

  })
})

function case22(): void {
  const info = demo2() // line65
  validateInfo(info, 'test/callstack/34.util.getCallerInfo.test.ts')
  assert(info.line === -1, JSON.stringify(info, null, 2))
  assert(info.column === -1, JSON.stringify(info, null, 2))
  assert(info.funcName === 'case22', JSON.stringify(info, null, 2))
  assert(info.methodName === 'case22', JSON.stringify(info, null, 2))
  assert(info.className === 'Context', JSON.stringify(info, null, 2))
  if (isNodeGteV23 || isNodeGteV22_13) {
    assert(info.lineNumber === 65, JSON.stringify(info, null, 2))
    assert(info.columnNumber === 16, JSON.stringify(info, null, 2))
  }
  else {
    assert(info.lineNumber === 53, JSON.stringify(info, null, 2))
    assert(info.columnNumber === 18, JSON.stringify(info, null, 2))
  }
}

