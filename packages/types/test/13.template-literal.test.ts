import { Equals, SnakeToCamel, SnakeToPascal } from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


describe('13.template-literal.test.ts', () => {

  describe('should SnakeToCamel work', () => {
    it('normal', () => {
      type Foo = 'tb_user'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('two', () => {
      type Foo = 'tb_user_two'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUserTwo'
      const ret: Equals<T1, ExpectType> = true
    })

    it('three', () => {
      type Foo = 'tb_user_two_three'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUserTwoThree'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake', () => {
      type Foo = 'tb_user_tWo_threE'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUserTWoThreE'
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should SnakeToPascal work', () => {
    it('normal', () => {
      type Foo = 'tb_user'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('two', () => {
      type Foo = 'tb_user_two'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUserTwo'
      const ret: Equals<T1, ExpectType> = true
    })

    it('three', () => {
      type Foo = 'tb_user_two_three'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUserTwoThree'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake', () => {
      type Foo = 'tb_user_tWo_threE'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUserTWoThreE'
      const ret: Equals<T1, ExpectType> = true
    })
  })

})

