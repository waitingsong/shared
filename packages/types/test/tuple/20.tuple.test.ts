
import { fileShortPath } from '@waiting/shared-core'

import type {
  Equals,
  TupleConcat,
  TupleHead,
  TupleLast,
  TuplePush,
  TupleRemoveLast,
  TupleTail,
  TupleToUnion,
  TupleUnshift,
  isInLiteralTuple,
} from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should TupleHead work', () => {
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

  describe('should TupleTail work', () => {
    it('normal', () => {
      type Foo = [string, number, string]
      type T1 = TupleTail<Foo>
      type ExpectType = [number, string]
      const ret: Equals<T1, ExpectType> = true
    })
    it('mix', () => {
      type Foo = [1, 3, '2']
      type T1 = TupleTail<Foo>
      type ExpectType = [3, '2']
      const ret: Equals<T1, ExpectType> = true
    })
    it('empty', () => {
      type Foo = []
      type T1 = TupleTail<Foo>
      type ExpectType = []
      const ret: Equals<T1, ExpectType> = true
    })
    it('[unknown]', () => {
      type Foo = [unknown]
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
    it('[any]', () => {
      type Foo = [any]
      type T1 = TupleTail<Foo>
      type ExpectType = []
      const ret: Equals<T1, ExpectType> = true
    })
    it('any[]', () => {
      type Foo = any[]
      type T1 = TupleTail<Foo>
      type ExpectType = unknown[]
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should TupleLast work', () => {
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

  describe('should TupleRemoveLast work', () => {
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


  describe('should TupleUnshift work', () => {
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

  describe('should TuplePush work', () => {
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

  describe('should TupleConcat work', () => {
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

  describe('should isInTuple work', () => {
    it('pri string', () => {
      type Foo = [string]

      const ret0: isInLiteralTuple<Foo, any> = true
      const ret1: isInLiteralTuple<Foo, string> = true

      const ret2: isInLiteralTuple<Foo, number> = false
    })
    it('pri mixed', () => {
      type Foo = [string, number, string]

      const ret0: isInLiteralTuple<Foo, any> = true
      const ret1: isInLiteralTuple<Foo, string> = true
      const ret2: isInLiteralTuple<Foo, number> = true
    })
    it('literal mixed', () => {
      type Foo = ['ab', 1, '3']

      const ret0: isInLiteralTuple<Foo, any> = true
      const ret1: isInLiteralTuple<Foo, string> = true
      const ret2: isInLiteralTuple<Foo, 'ab'> = true
      const ret3: isInLiteralTuple<Foo, '3'> = true

      const ret4: isInLiteralTuple<Foo, number> = true
      const ret5: isInLiteralTuple<Foo, 1> = true

      const ret6: isInLiteralTuple<Foo, 'a'> = false
      const ret7: isInLiteralTuple<Foo, '1'> = false
      const ret8: isInLiteralTuple<Foo, ''> = false
      const ret9: isInLiteralTuple<Foo, 2> = false
    })
    it('any', () => {
      type Foo = [any]

      const ret0: isInLiteralTuple<Foo, any> = true
      const ret1: isInLiteralTuple<Foo, string> = true
      const ret2: isInLiteralTuple<Foo, number> = true
    })
  })


  describe('should TupleToUnion work', () => {
    it('pri string', () => {
      type Foo = [string, string]
      const ret0: TupleToUnion<Foo> = 'abc'
    })
    it('pri mixed', () => {
      type Foo = [string, number, string, bigint]

      const ret0: TupleToUnion<Foo> = 'ab'
      const ret1: TupleToUnion<Foo> = 1
      // mocha not support now
      // const ret2: TupleToUnion<Foo> = 1n
    })
    it('literal mixed', () => {
      type Foo = ['ab', 1, '3']

      const ret0: TupleToUnion<Foo> = 'ab'
      const ret1: TupleToUnion<Foo> = 1
      const ret2: TupleToUnion<Foo> = '3'
    })
    it('any', () => {
      type Foo = [any, string]

      const ret0: TupleToUnion<Foo> = 'ab'
    })
    it('unknown', () => {
      type Foo = [unknown]

      const ret0: TupleToUnion<Foo> = 'ab'
      const ret1: TupleToUnion<Foo> = 1
      // mocha not support now
      // const ret2: TupleToUnion<Foo> = 1n
    })
  })

})

