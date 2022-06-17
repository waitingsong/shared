import assert from 'assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  JsonType,
  JsonResp,
} from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should JsonType work with valid value', () => {
    it('string', () => {
      const ret: JsonType = 'abc'
    })
    it('number', () => {
      const ret1: JsonType = 1
      const ret2: JsonType = 1.1
      const ret3: JsonType = -1.1
      const ret4: JsonType = Number.MAX_SAFE_INTEGER
      const ret5: JsonType = Number.MIN_VALUE
    })
    it('boolean', () => {
      const ret1: JsonType = true
      const ret2: JsonType = false
    })
    it('null', () => {
      const ret1: JsonType = null
    })
    it('array', () => {
      const ret1: JsonType = [1, 0, 'a', null]
    })
    it('object', () => {
      const ret1: JsonType = {
        foo: 1,
        bar: 'bar',
        1: [1, 0, 'a', null],
        2: null,
        3: true,
      }
    })
  })

  describe('should JsonType work with invalid value', () => {
    it('undefined', () => {
      // @ts-expect-error
      const ret1: JsonType = undefined
      // @ts-expect-error
      const ret2: JsonType = [1, undefined]
      // @ts-expect-error
      const ret3: JsonType = {
        foo: [1, undefined],
      }
    })
    it('Date', () => {
      // @ts-expect-error
      const ret: JsonType = new Date()
      // @ts-expect-error
      const ret2: JsonType = [1, new Date()]
      // @ts-expect-error
      const ret3: JsonType = {
        foo: [1, new Date()],
      }
    })
    it('Symbol', () => {
      // @ts-expect-error
      const ret: JsonType = Symbol.for('abc')
      // @ts-expect-error
      const ret2: JsonType = [1, Symbol.for('a')]
      // @ts-expect-error
      const ret3: JsonType = {
        foo: [1, Symbol.for('1')],
      }
    })
    it('Function', () => {
      // @ts-expect-error
      const ret: JsonType = () => 1
      // @ts-expect-error
      const ret2: JsonType = [1, () => 1]
      // @ts-expect-error
      const ret3: JsonType = {
        foo: [1, () => 1],
      }
      // @ts-expect-error
      const ret4: JsonType = {
        bar: () => 2,
      }
    })
  })

  describe('should JsonResp["data"] work with generics', () => {
    it('with passing generics', () => {
      const ret: JsonResp<number> = {
        code: 0,
        data: 1,
      }
      const foo: number = ret.data
      assert(foo === 1)
    })
    it('w/o passing generics', () => {
      const ret: JsonResp = {
        code: 0,
        data: 1,
      }
      const foo: unknown = ret.data
      assert(foo === 1)
    })
  })

})

