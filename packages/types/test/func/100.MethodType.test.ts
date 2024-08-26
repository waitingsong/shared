import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import type { MethodType } from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should MethodType work', () => {
    it('normal type', () => {
      const foo: MethodType = (a: number, b: string): string => {
        return `${a}${b}`
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const ret = foo(1, '2')
      const expect = '12'
      assert(ret === expect)
    })

    it('normal type 2', () => {
      const foo: MethodType = function (a: number, b: string) {
        return `${a}${b}`
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const ret = foo(1, '2')
      const expect = '12'
      assert(ret === expect)
    })

    it('pass this', () => {
      const data = { x: 100, y: 200 }
      const foo: MethodType<[number, string], string, typeof data> = (a: number, b: string): string => {
        return `${a}${b}`
      }
      const ret = foo.bind(data)(1, '2')
      const expect = '12'
      assert(ret === expect)
    })

    it('pass this 2', () => {
      const data = { x: 100, y: 200 }
      const foo: MethodType<[number, string], string, typeof data> = function (a: number, b: string) {
        assert(this === data)
        return `${a}${b}`
      }
      const ret = foo.bind(data)(1, '2')
      const expect = '12'
      assert(ret === expect)
    })
  })

})

