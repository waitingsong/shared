import assert from 'assert/strict'

import {
  Equals,
  CamelToSnake,
} from '../src/index'



describe('15.camelToSnake.test.ts', () => {

  describe('should camelToSnake work', () => {
    it('1', () => {
      type Foo = 'tUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 't_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('2', () => {
      type Foo = 'tbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('3', () => {
      type Foo = 'TbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('4', () => {
      type Foo = '6UserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '6_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('5', () => {
      type Foo = '_tbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '_tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('6', () => {
      type Foo = 'tb6UserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_6_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('7', () => {
      type Foo = '7tb7UserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '7tb_7_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('8', () => {
      type Foo = 'tb_UserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb__user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('9', () => {
      type Foo = 'tb_userId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('10', () => {
      type Foo = 'Tb_Us_erId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb__us_er_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('11', () => {
      type Foo = '_TbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '__tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('12', () => {
      type Foo = '__TbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '___tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('13', () => {
      type Foo = '___TbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '____tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('14', () => {
      type Foo = '__tbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '__tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('15', () => {
      type Foo = '___tbUserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '___tb_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })
  })

})

