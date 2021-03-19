/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { snakeToCamel, snakeToPascal } from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should snakeToCamel works', () => {
    it('normal', () => {
      const Foo = 'tb_user'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 'tbUser'
      assert(T1 === ExpectType)
    })

    it('two', () => {
      const Foo = 'tb_user_two'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 'tbUserTwo'
      assert(T1 === ExpectType)
    })

    it('three', () => {
      const Foo = 'tb_user_two_three'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 'tbUserTwoThree'
      assert(T1 === ExpectType)
    })

    it('non standard snake', () => {
      const Foo = 'tb_user_tWo_threE'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 'tbUserTWoThreE'
      assert(T1 === ExpectType)
    })

    it('minus', () => {
      const Foo = 'tb_user-tWo_threE'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 'tbUserTWoThreE'
      assert(T1 === ExpectType)
    })
  })

  describe('should SnakeToPascal works', () => {
    it('normal', () => {
      const Foo = 'tb_user'
      const T1 = snakeToPascal(Foo)
      const ExpectType = 'TbUser'
      assert(T1 === ExpectType)
    })

    it('two', () => {
      const Foo = 'tb_user_two'
      const T1 = snakeToPascal(Foo)
      const ExpectType = 'TbUserTwo'
      assert(T1 === ExpectType)
    })

    it('three', () => {
      const Foo = 'tb_user_two_three'
      const T1 = snakeToPascal(Foo)
      const ExpectType = 'TbUserTwoThree'
      assert(T1 === ExpectType)
    })

    it('non standard snake', () => {
      const Foo = 'tb_user_tWo_threE'
      const T1 = snakeToPascal(Foo)
      const ExpectType = 'TbUserTWoThreE'
      assert(T1 === ExpectType)
    })


    it('minus', () => {
      const Foo = 'tb_user-tWo_threE'
      const T1 = snakeToPascal(Foo)
      const ExpectType = 'TbUserTWoThreE'
      assert(T1 === ExpectType)
    })
  })

})

