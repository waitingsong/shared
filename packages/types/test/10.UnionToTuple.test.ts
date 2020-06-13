/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { UnionToTuple, Equals } from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should UnionToTuple works', () => {
    it('noraml', () => {
      type Foo = { name: 'foo' } | { age: 1}
      type T1 = UnionToTuple<Foo>
      type ExpectType = [{ age: 1}, { name: 'foo' }]
      const ret: Equals<T1, ExpectType> = true
    })
    it('order not exact', () => {
      type Bar = { name: 'foo' } | 1 | 2 | 3
      type T2 = UnionToTuple<Bar> // [3, {name: 'foo'}, 2, 1]
      type ExpectOrder2 = [3, 2, 1, {name: 'foo'}]
      const ret: Equals<T2, ExpectOrder2> = false
    })
  })

})

