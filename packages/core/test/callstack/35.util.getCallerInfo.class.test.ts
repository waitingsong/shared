import assert from 'node:assert'

import { getCallerInfo } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'
import { isNodeGteV23 } from '#@/root.config.js'

import { Foo, _demo, validateInfo } from './34a.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('getCallerInfo() class', () => {
    it('distance: 0', () => {
      const F1 = new Foo()
      const info = F1.foo()
      validateInfo(info, 'test/callstack/34a.config.ts')
      assert(info.className === 'Foo', `expect Foo, but got ${info.className}`)
      assert(info.funcName === 'foo', `expect foo, but got ${info.funcName}`)
      assert(info.srcPath === '', `expect blank, but got ${info.srcPath}`)
      if (isNodeGteV23) {
        assert(info.columnNumber === 12, `expect 12, but got ${info.columnNumber}`)
        assert(info.lineNumber === 16, `expect 16, but got ${info.lineNumber}`)
      }
      else {
        assert(info.columnNumber === 16, `expect 16, but got ${info.columnNumber}`)
        assert(info.lineNumber === 10, `expect 10, but got ${info.lineNumber}`)
      }
    })

    it('distance: 1', () => {
      const F1 = new Foo()
      const info = F1.barz()
      validateInfo(info, 'test/callstack/34a.config.ts')
      assert(info.className === 'Foo', `expect Foo, but got ${info.className}`)
      assert(info.funcName === 'barz', `expect foo, but got ${info.funcName}`)
      assert(info.srcPath === '', `expect blank, but got ${info.srcPath}`)
      if (isNodeGteV23) {
        assert(info.columnNumber === 17, `expect 17, but got ${info.columnNumber}`)
        assert(info.lineNumber === 24, `expect 24, but got ${info.lineNumber}`)
      }
      else {
        assert(info.columnNumber === 21, `expect 21, but got ${info.columnNumber}`)
        assert(info.lineNumber === 16, `expect 16, but got ${info.lineNumber}`)
      }
    })
  })
})

