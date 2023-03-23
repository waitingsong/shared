import assert from 'node:assert/strict'

import { snakeToCamel } from '../../src/index.js'
import { fileShortPath } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should snakeToCamel work with _', () => {
    it('normal', () => {
      const Foo = 'tb_user'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUser'
      assert(T1 === Expectconst)
    })

    it('two', () => {
      const Foo = 'tb_user_two'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUserTwo'
      assert(T1 === Expectconst)
    })

    it('three', () => {
      const Foo = 'tb_user_two_Three'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUserTwoThree'
      assert(T1 === Expectconst)
    })

    it('non standard snake', () => {
      const Foo = 'tb_user_tWo_ThreE'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUserTWoThreE'
      assert(T1 === Expectconst)
    })

    it('non standard snake 2', () => {
      const Foo = 't_b_u'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tBU'
      assert(T1 === Expectconst)
    })

    it('non standard snake 3', () => {
      const Foo = 'tb_user_t_wo_Thre_e'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUserTWoThreE'
      assert(T1 === Expectconst)
    })

    it('non standard snake 4', () => {
      const Foo = 'tb_USER_ext'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUSERExt'
      assert(T1 === Expectconst)
    })

    it('non standard snake 5', () => {
      const Foo = 'TB_USER_EXT'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'TBUSEREXT'
      assert(T1 === Expectconst)
    })

    it('non standard snake 6', () => {
      const Foo = 'foo_JWT'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'fooJWT'
      assert(T1 === Expectconst)
    })

    it('non standard snake 7', () => {
      const Foo = 'foo_jWT'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'fooJWT'
      assert(T1 === Expectconst)
    })


    it('number', () => {
      const Foo = 'tb_user_2_good'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUser_2Good'
      assert(T1 === Expectconst, `expect ${Expectconst} but got ${T1}`)
    })

    it('number a', () => {
      const Foo = 'tb_user_2a_good'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUser_2aGood'
      assert(T1 === Expectconst, `expect ${Expectconst} but got ${T1}`)
    })

    it('number only', () => {
      const Foo = '12_34__45___67'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '12_34__45___67'
      assert(T1 === Expectconst, `expect ${Expectconst} but got ${T1}`)
    })

    it('number only with tailing', () => {
      const Foo = '12_3__45___67________'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '12_3__45___67________'
      assert(T1 === Expectconst, `expect ${Expectconst} but got ${T1}`)
    })

    // it('number only w/o tailing', () => {
    //   const Foo = '12_3__45___67________'
    //   const T1 = snakeToCamel(Foo, '_', true, true)
    //   const Expectconst = '1234567'
    //   assert(T1 === Expectconst)
    // })

    it('number only one with tailing', () => {
      const Foo = '1__'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '1__'
      assert(T1 === Expectconst)
    })

    // it('number only one w/o tailing', () => {
    //   const Foo = '1__'
    //   const T1 = snakeToCamel(Foo, '_', true, true)
    //   const Expectconst = '1'
    //   assert(T1 === Expectconst)
    // })

    it('under 1', () => {
      const Foo = '_tb_user'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '_tbUser'
      assert(T1 === Expectconst)
    })

    it('leading ', () => {
      const Foo = '__tb_user'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '__tbUser'
      assert(T1 === Expectconst)
    })

    // it('leading with TrimStart:false', () => {
    //   const Foo = '__tb_user'
    //   const T1 = snakeToCamel(Foo, '_', false)
    //   const Expectconst = '__tbUser'
    //   assert(T1 === Expectconst)
    // })

    // it('leading with TrimStart:true', () => {
    //   const Foo = '__tb_user'
    //   const T1 = snakeToCamel(Foo, '_', true)
    //   const Expectconst = 'tbUser'
    //   assert(T1 === Expectconst)
    // })

    it('mix', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '-TbUser'
      assert(T1 === Expectconst)
    })

    // it('mix with TrimStart:true', () => {
    //   const Foo = '-__tb_user'
    //   const T1 = snakeToCamel(Foo, '_', true)
    //   const Expectconst = '-TbUser'
    //   assert(T1 === Expectconst)
    // })

    it('mix2', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToCamel(snakeToCamel(Foo, '-'), '_')
      const Expectconst = '-TbUser'
      assert(T1 === Expectconst)
    })

    it('mix2a', () => {
      const Foo = '-__tb_user'
      const T1 = snakeToCamel(snakeToCamel(Foo, '_'), '-')
      const Expectconst = '-TbUser'
      assert(T1 === Expectconst)
    })

    // it('mix2 with TrimStart:true', () => {
    //   const Foo = '-__tb_user'
    //   const T1 = snakeToCamel(snakeToCamel(Foo, '_', true), '-', true)
    //   const Expectconst = 'TbUser'
    //   assert(T1 === Expectconst)
    // })

    // it('mix2a with TrimStart:true', () => {
    //   const Foo = '-__tb_user'
    //   const T1 = snakeToCamel(snakeToCamel(Foo, '-', true), '_', true)
    //   const Expectconst = 'tbUser'
    //   assert(T1 === Expectconst)
    // })

    // it('mix2 with TrimStart:true, TrimEnd:false', () => {
    //   const Foo = '-__tb_user__'
    //   const T1 = snakeToCamel(snakeToCamel(Foo, '-', true, false), '_', true)
    //   const Expectconst = 'tbUser__'
    //   assert(T1 === Expectconst)
    // })

    // it('mix2 with TrimStart:true, TrimEnd:true', () => {
    //   const Foo = '-__tb_user__'
    //   const T1 = snakeToCamel(snakeToCamel(Foo, '-', true, true), '_', true, true)
    //   const Expectconst = 'tbUser'
    //   assert(T1 === Expectconst)
    // })

    it('leading delimiter', () => {
      const Foo = '___tb_user_2good'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '___tbUser_2good'
      assert(T1 === Expectconst)
    })

    // it('leading delimiter with TrimStart:true', () => {
    //   const Foo = '___tb_user_2good'
    //   const T1 = snakeToCamel(Foo, '_', true)
    //   const Expectconst = 'tbUser2good'
    //   assert(T1 === Expectconst)
    // })

    it('under more with tailing', () => {
      const Foo = 'tb______user__________'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 'tbUser__________'
      assert(T1 === Expectconst)
    })

    // it('under more  TrimEnd:true', () => {
    //   const Foo = 'tb______user__________'
    //   const T1 = snakeToCamel(Foo, '_', false, true)
    //   const Expectconst = 'tbUser'
    //   assert(T1 === Expectconst)
    // })

    it('under more 2 with tailing', () => {
      const Foo = '_______________tb______user__________'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '_______________tbUser__________'
      assert(T1 === Expectconst)
    })

    // it('under more 2 TrimEnd:true', () => {
    //   const Foo = '_______________tb______user__________'
    //   const T1 = snakeToCamel(Foo, '_', false, true)
    //   const Expectconst = '_______________tbUser'
    //   assert(T1 === Expectconst)
    // })

    it('under only', () => {
      const Foo = '___'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '___'
      assert(T1 === Expectconst)
    })

    // it('under only with TrimStart:true', () => {
    //   const Foo = '___'
    //   const T1 = snakeToCamel(Foo, '_', true)
    //   const Expectconst = ''
    //   assert(T1 === Expectconst)
    // })

    it('under number', () => {
      const Foo = '_67'
      const T1 = snakeToCamel(Foo)
      const Expectconst = '_67'
      assert(T1 === Expectconst)
    })

    // it('under number with TrimStart:true', () => {
    //   const Foo = '_67'
    //   const T1 = snakeToCamel(Foo, '_', true)
    //   const Expectconst = '67'
    //   assert(T1 === Expectconst)
    // })

    it('trailing delimiter with tailing', () => {
      const Foo = 't_'
      const T1 = snakeToCamel(Foo)
      const Expectconst = 't_'
      assert(T1 === Expectconst)
    })

    // it('trailing delimiter TrimEnd:true', () => {
    //   const Foo = 't_'
    //   const T1 = snakeToCamel(Foo, '_', false, true)
    //   const Expectconst = 't'
    //   assert(T1 === Expectconst)
    // })
  })

  describe('should snakeToCamel work with -', () => {
    it('normal', () => {
      const Foo = 'tb-user'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = 'tbUser'
      assert(T1 === Expectconst)
    })

    it('two', () => {
      const Foo = 'tb-user-two'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = 'tbUserTwo'
      assert(T1 === Expectconst)
    })

    it('three', () => {
      const Foo = 'tb-user-two-three'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = 'tbUserTwoThree'
      assert(T1 === Expectconst)
    })

    it('non standard snake', () => {
      const Foo = 'tb-user-tWo-ThreE'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = 'tbUserTWoThreE'
      assert(T1 === Expectconst)
    })

    it('minus 1', () => {
      const Foo = '-tb-user'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = '-tbUser'
      assert(T1 === Expectconst)
      assert(T1 === Expectconst)
    })

    it('minus 2', () => {
      const Foo = '--tb-user'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = '--tbUser'
      assert(T1 === Expectconst)
    })

    it('minus more', () => {
      const Foo = '-----tb-----user-----'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = '-----tbUser-----'
      assert(T1 === Expectconst)
    })

    it('under minus', () => {
      const Foo = '___---'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = '___---'
      assert(T1 === Expectconst)
    })

    // it('under minus TrimStart:true, TrimEnd:true', () => {
    //   const Foo = '___---'
    //   const T1 = snakeToCamel(Foo, '-', true, true)
    //   const Expectconst = '___'
    //   assert(T1 === Expectconst)
    // })

    it('under number', () => {
      const Foo = '-67'
      const T1 = snakeToCamel(Foo, '-')
      const Expectconst = '-67'
      assert(T1 === Expectconst)
    })
  })

  describe('should snakeToCamel work with u', () => {
    it('normal', () => {
      const Foo = 'tb_user'
      const T1 = snakeToCamel(Foo, 'u')
      const Expectconst = 'tb_Ser'
      assert(T1 === Expectconst)
    })

    it('string', () => {
      const Foo = 'tbuser'
      const T1 = snakeToCamel(Foo, 'u')
      const Expectconst = 'tbSer'
      assert(T1 === Expectconst)
    })
  })

})

