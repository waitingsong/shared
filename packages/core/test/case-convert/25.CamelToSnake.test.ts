import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { camelToSnake } from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should camelToSnake work', () => {
    it('1', () => {
      const Foo = 'tUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = 't_user_id'
      assert(T1 === Expectconst)
    })

    it('2', () => {
      const Foo = 'tbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb_user_id'
      assert(T1 === Expectconst)
    })

    it('3', () => {
      const Foo = 'TbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb_user_id'
      assert(T1 === Expectconst)
    })

    it('4', () => {
      const Foo = '6UserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '6_user_id'
      assert(T1 === Expectconst)
    })

    it('5', () => {
      const Foo = '_tbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '_tb_user_id'
      assert(T1 === Expectconst)
    })

    it('6', () => {
      const Foo = 'tb6UserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb6_user_id'
      assert(T1 === Expectconst, `expect ${Expectconst} but got ${T1}`)
    })

    it('7', () => {
      const Foo = '7tb7UserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '7tb7_user_id'
      assert(T1 === Expectconst, `expect ${Expectconst} but got ${T1}`)
    })

    it('8', () => {
      const Foo = 'tb_UserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb__user_id'
      assert(T1 === Expectconst)
    })

    it('9', () => {
      const Foo = 'tb_userId'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb_user_id'
      assert(T1 === Expectconst)
    })

    it('10', () => {
      const Foo = 'Tb_Us_erId'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb__us_er_id'
      assert(T1 === Expectconst)
    })

    it('number', () => {
      const Foo = 'tbUser2Good'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb_user2_good'
      assert(T1 === Expectconst)
    })

    it('11', () => {
      const Foo = '_TbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '__tb_user_id'
      assert(T1 === Expectconst)
    })

    it('12', () => {
      const Foo = '__TbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '___tb_user_id'
      assert(T1 === Expectconst)
    })

    it('13', () => {
      const Foo = '___TbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '____tb_user_id'
      assert(T1 === Expectconst)
    })

    it('14', () => {
      const Foo = '__tbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '__tb_user_id'
      assert(T1 === Expectconst)
    })

    it('15', () => {
      const Foo = '___tbUserId'
      const T1 = camelToSnake(Foo)
      const Expectconst = '___tb_user_id'
      assert(T1 === Expectconst)
    })

    it('16', () => {
      const Foo = '___tbUserId__'
      const T1 = camelToSnake(Foo)
      const Expectconst = '___tb_user_id__'
      assert(T1 === Expectconst)
    })

    it('non standard camel', () => {
      const Foo = 'tbUserTWo_ThreE'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb_user_t_wo__thre_e'
      assert(T1 === Expectconst)
    })

    it('non standard camel 2', () => {
      const Foo = 'tBU'
      const T1 = camelToSnake(Foo)
      const Expectconst = 't_b_u'
      assert(T1 === Expectconst)
    })

    it('non standard camel 3', () => {
      const Foo = 'tbUserTWo_ThreE'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb_user_t_wo__thre_e'
      assert(T1 === Expectconst)
    })

    it('non standard camel 4', () => {
      const Foo = 'tb_USERExt'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'tb__u_s_e_r_ext'
      assert(T1 === Expectconst)
    })

    it('non standard camel 5', () => {
      const Foo = 'TB_USER_EXT'
      const T1 = camelToSnake(Foo)
      const Expectconst = 't_b__u_s_e_r__e_x_t'
      assert(T1 === Expectconst)
    })

    it('non standard camel 6', () => {
      const Foo = 'fooJWT'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'foo_j_w_t'
      assert(T1 === Expectconst)
    })

    it('non standard camel 7', () => {
      const Foo = 'foo_JWT'
      const T1 = camelToSnake(Foo)
      const Expectconst = 'foo__j_w_t'
      assert(T1 === Expectconst)
    })
  })

})

