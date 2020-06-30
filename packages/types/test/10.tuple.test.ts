/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import {
  Equals,
  TupleHead,
  TupleTail,
  TupleLast,
  TupleRemoveLast,
  TupleUnshift,
  TuplePush,
  TupleConcat,
} from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should TupleHead works', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TupleHead<Foo>
      type ExpectType = string
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TupleHead<Foo>
      type ExpectType = undefined
      const ret: Equals<T1, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = [unknown]
      type T1 = TupleHead<Foo>
      type ExpectType = unknown
      const ret: Equals<T1, ExpectType> = true
    })
    it('any', () => {
      type Foo = [any]
      type T1 = TupleHead<Foo>
      type ExpectType = any
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should TupleTail works', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TupleTail<Foo>
      type ExpectType = [number, string]
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TupleTail<Foo>
      type ExpectType = []
      const ret: Equals<T1, ExpectType> = true
    })
    it('unknown[]', () => {
      type Foo = unknown[]
      type T1 = TupleTail<Foo>
      type ExpectType = unknown[]
      const ret: Equals<T1, ExpectType> = true
    })
    it('any', () => {
      type Foo = [any]
      type T1 = TupleTail<Foo>
      type ExpectType = []
      const ret: Equals<T1, ExpectType> = true
    })
    it('any[]', () => {
      type Foo = any[]
      type T1 = TupleTail<Foo>
      type ExpectType = any[]
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should TupleLast works', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TupleLast<Foo>
      type ExpectType = string
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TupleLast<Foo>
      type ExpectType = undefined
      const ret: Equals<T1, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = [unknown]
      type T1 = TupleLast<Foo>
      type ExpectType = unknown
      const ret: Equals<T1, ExpectType> = true
    })
    it('any', () => {
      type Foo = [any]
      type T1 = TupleLast<Foo>
      type ExpectType = any
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should TupleRemoveLast works', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TupleRemoveLast<Foo>
      type ExpectType = [string, number]
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TupleRemoveLast<Foo>
      type ExpectType = []
      const ret: Equals<T1, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = [unknown]
      type T1 = TupleRemoveLast<Foo>
      type ExpectType = []
      const ret: Equals<T1, ExpectType> = true
    })
    it('any', () => {
      type Foo = [any]
      type T1 = TupleRemoveLast<Foo>
      type ExpectType = []
      const ret: Equals<T1, ExpectType> = true
    })
  })


  describe('should TupleUnshift works', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TupleUnshift<Foo, bigint>
      type ExpectType = [bigint, string, number, string]
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TupleUnshift<Foo, bigint>
      type ExpectType = [bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = [unknown]
      type T1 = TupleUnshift<Foo, bigint>
      type ExpectType = [bigint, unknown]
      const ret: Equals<T1, ExpectType> = true
    })
    it('any', () => {
      type Foo = [any]
      type T1 = TupleUnshift<Foo, bigint>
      type ExpectType = [bigint, any]
      const ret: Equals<T1, ExpectType> = true
    })
    it('mixed', () => {
      type Foo = [1, 2, 'foo']
      type T1 = TupleUnshift<Foo, 3>
      type ExpectType = [3, 1, 2, 'foo']
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should TuplePush works', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TuplePush<Foo, bigint>
      type ExpectType = [string, number, string, bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TuplePush<Foo, bigint>
      type ExpectType = [bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = [unknown]
      type T1 = TuplePush<Foo, bigint>
      type ExpectType = [unknown, bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('any', () => {
      type Foo = [any]
      type T1 = TuplePush<Foo, bigint>
      type ExpectType = [any, bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('mixed', () => {
      type Foo = [1, 2, 'foo']
      type T1 = TuplePush<Foo, 3>
      type ExpectType = [1, 2, 'foo', 3]
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should TupleConcat works', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TupleConcat<Foo, [bigint]>
      type ExpectType = [string, number, string, bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TupleConcat<Foo, [bigint]>
      type ExpectType = [bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = [unknown]
      type T1 = TupleConcat<Foo, [bigint]>
      type ExpectType = [unknown, bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('any', () => {
      type Foo = [any]
      type T1 = TupleConcat<Foo, [bigint]>
      type ExpectType = [any, bigint]
      const ret: Equals<T1, ExpectType> = true
    })
    it('mixed', () => {
      type Foo = [1, 2, 'foo']
      type T1 = TupleConcat<Foo, [3, 'bar', 'foo']>
      type ExpectType = [1, 2, 'foo', 3, 'bar', 'foo']
      const ret: Equals<T1, ExpectType> = true
    })
  })


})

