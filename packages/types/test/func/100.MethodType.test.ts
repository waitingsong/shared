import assert from 'assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { MethodType } from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should MethodType work', () => {
    it('normal type', () => {
      const foo: MethodType = (a: number, b: string): string => {
        return `${a}${b}`
      }
      const ret = foo(1, '2')
      const expect = '12'
      assert(ret === expect)
    })
  })

})

