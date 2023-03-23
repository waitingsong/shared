import { fileShortPath } from '@waiting/shared-core'

import {
  Equals,
  CamelToSnake,
} from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should CamelToSnake work', () => {
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
      type ExpectType = 'tb6_user_id'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('7', () => {
      type Foo = '7tb7UserId'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '7tb7_user_id'
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

    it('number', () => {
      type Foo = 'tbUser2Good'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_user2_good'
      const ret: Equals<T1, ExpectType> = true
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

    it('16', () => {
      type Foo = '___tbUserId__'
      type T1 = CamelToSnake<Foo>
      type ExpectType = '___tb_user_id__'
      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('non standard camel', () => {
      type Foo = 'tbUserTWo_ThreE'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_user_t_wo__thre_e'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard camel 2', () => {
      type Foo = 'tBU'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 't_b_u'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard camel 3', () => {
      type Foo = 'tbUserTWo_ThreE'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_user_t_wo__thre_e'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard camel 4', () => {
      type Foo = 'tb_USERExt'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb__u_s_e_r_ext'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard camel 5', () => {
      type Foo = 'TB_USER_EXT'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 't_b__u_s_e_r__e_x_t'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard camel 6', () => {
      type Foo = 'fooJWT'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'foo_j_w_t'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard camel 7', () => {
      type Foo = 'foo_JWT'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'foo__j_w_t'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number mix _', () => {
      type Foo = 'vi_001_23_user4'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'vi_001_23_user4'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number mix _', () => {
      type Foo = 'tbUser_2aGood'
      type T1 = CamelToSnake<Foo>
      type ExpectType = 'tb_user_2a_good'
      const ret: Equals<T1, ExpectType> = true
    })
  })

})

