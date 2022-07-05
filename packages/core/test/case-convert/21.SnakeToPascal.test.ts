import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { snakeToPascal } from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should snakeToPascal work with _', () => {
    it('normal', () => {
      const Foo = 'tb_user'
      const T1 = snakeToPascal(Foo)
      const Expectconst = 'TbUser'
      assert(T1 === Expectconst)
    })

    it('two', () => {
      const Foo = 'tb_user_two'
      const T1 = snakeToPascal(Foo)
      const Expectconst = 'TbUserTwo'
      assert(T1 === Expectconst)
    })

    it('three', () => {
      const Foo = 'tb_user_two_Three'
      const T1 = snakeToPascal(Foo)
      const Expectconst = 'TbUserTwoThree'
      assert(T1 === Expectconst)
    })

    it('non standard snake', () => {
      const Foo = 'tb_user_tWo_ThreE'
      const T1 = snakeToPascal(Foo)
      const Expectconst = 'TbUserTWoThreE'
      assert(T1 === Expectconst)
    })

    it('number', () => {
      const Foo = 'tb_user_2_good'
      const T1 = snakeToPascal(Foo)
      const Expectconst = 'TbUser2Good'
      assert(T1 === Expectconst)
    })

    it('number only', () => {
      const Foo = '12_3__45___67'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '1234567'
      assert(T1 === Expectconst)
    })

    it('number only with tailing', () => {
      const Foo = '12_3__45___67________'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '1234567________'
      assert(T1 === Expectconst)
    })

    it('number only TrimEnd:true', () => {
      const Foo = '12_3__45___67________'
      const T1 = snakeToPascal(Foo, '_', false, true)
      const Expectconst = '1234567'
      assert(T1 === Expectconst)
    })

    it('number only one with tailing', () => {
      const Foo = '1__'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '1__'
      assert(T1 === Expectconst)
    })

    it('number only one TrimEnd:true', () => {
      const Foo = '1__'
      const T1 = snakeToPascal(Foo, '_', false, true)
      const Expectconst = '1'
      assert(T1 === Expectconst)
    })

    it('under 1', () => {
      const Foo = '_tb_user'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '_TbUser'
      assert(T1 === Expectconst)
    })

    it('leading ', () => {
      const Foo = '__tb_user'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '__TbUser'
      assert(T1 === Expectconst)
    })

    it('leading with TrimStart:false', () => {
      const Foo = '__tb_user'
      const T1 = snakeToPascal(Foo, '_', false)
      const Expectconst = '__TbUser'
      assert(T1 === Expectconst)
    })

    it('leading with TrimStart:true', () => {
      const Foo = '__tb_user'
      const T1 = snakeToPascal(Foo, '_', true)
      const Expectconst = 'TbUser'
      assert(T1 === Expectconst)
    })

    it('mix', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '-TbUser'
      assert(T1 === Expectconst)
    })

    it('mix with TrimStart:true', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToPascal(Foo, '_', true)
      const Expectconst = '-TbUser'
      assert(T1 === Expectconst)
    })

    it('mix2', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToPascal(snakeToPascal(Foo, '-'), '_')
      const Expectconst = '-TbUser'
      assert(T1 === Expectconst)
    })

    it('mix2a', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToPascal(snakeToPascal(Foo, '_'), '-')
      const Expectconst = '-TbUser'
      assert(T1 === Expectconst)
    })

    it('mix2 with TrimStart:true', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToPascal(snakeToPascal(Foo, '_', true), '-', true)
      const Expectconst = 'TbUser'
      assert(T1 === Expectconst)
    })

    it('mix2a with TrimStart:true', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToPascal(snakeToPascal(Foo, '-', true), '_', true)
      const Expectconst = 'TbUser'
      assert(T1 === Expectconst)
    })

    it('leading delimiter', () => {
      const Foo = '___tb_user_2good'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '___TbUser2good'
      assert(T1 === Expectconst)
    })

    it('leading delimiter with TrimStart:true', () => {
      const Foo = '___tb_user_2good'
      const T1 = snakeToPascal(Foo, '_', true)
      const Expectconst = 'TbUser2good'
      assert(T1 === Expectconst)
    })

    it('under more with tailing', () => {
      const Foo = 'tb______user__________'
      const T1 = snakeToPascal(Foo)
      const Expectconst = 'TbUser__________'
      assert(T1 === Expectconst)
    })

    it('under more TrimEnd:true', () => {
      const Foo = 'tb______user__________'
      const T1 = snakeToPascal(Foo, '_', false, true)
      const Expectconst = 'TbUser'
      assert(T1 === Expectconst)
    })

    it('under more 2 with tailing', () => {
      const Foo = '_______________tb______user__________'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '_______________TbUser__________'
      assert(T1 === Expectconst)
    })
    it('under more 2 TrimEnd:true', () => {
      const Foo = '_______________tb______user__________'
      const T1 = snakeToPascal(Foo, '_', false, true)
      const Expectconst = '_______________TbUser'
      assert(T1 === Expectconst)
    })

    it('under only', () => {
      const Foo = '___'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '___'
      assert(T1 === Expectconst)
    })

    it('under only with TrimStart:true', () => {
      const Foo = '___'
      const T1 = snakeToPascal(Foo, '_', true)
      const Expectconst = ''
      assert(T1 === Expectconst)
    })

    it('under number', () => {
      const Foo = '_67'
      const T1 = snakeToPascal(Foo)
      const Expectconst = '_67'
      assert(T1 === Expectconst)
    })

    it('under number with TrimStart:true', () => {
      const Foo = '_67'
      const T1 = snakeToPascal(Foo, '_', true)
      const Expectconst = '67'
      assert(T1 === Expectconst)
    })

    it('trailing delimiter with tailing', () => {
      const Foo = 't_'
      const T1 = snakeToPascal(Foo)
      const Expectconst = 'T_'
      assert(T1 === Expectconst)
    })

    it('trailing delimiter TrimEnd:true', () => {
      const Foo = 't_'
      const T1 = snakeToPascal(Foo, '_', false, true)
      const Expectconst = 'T'
      assert(T1 === Expectconst)
    })
  })

})

