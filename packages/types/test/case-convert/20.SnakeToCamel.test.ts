import { fileShortPath } from '@waiting/shared-core'

import {
  Equals,
  SnakeToCamel,
} from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should SnakeToCamel work with _', () => {
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
      type Foo = 'tb_user_two_Three'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUserTwoThree'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake', () => {
      type Foo = 'tb_user_tWo_ThreE'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUserTWoThreE'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake 2', () => {
      type Foo = 't_b_u'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tBU'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake 3', () => {
      type Foo = 'tb_user_t_wo_Thre_e'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUserTWoThreE'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake 4', () => {
      type Foo = 'tb_USER_ext'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUSERExt'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake 5', () => {
      type Foo = 'TB_USER_EXT'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'TBUSEREXT'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake 6', () => {
      type Foo = 'foo_JWT'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'fooJWT'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake 7', () => {
      type Foo = 'foo_jWT'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'fooJWT'
      const ret: Equals<T1, ExpectType> = true
    })


    it('number', () => {
      type Foo = 'tb_user_2_good'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUser_2Good'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number a', () => {
      type Foo = 'tb_user_2a_good'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUser_2aGood'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number only', () => {
      type Foo = '12_3__45___67'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '12_3__45___67'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number only with tailing', () => {
      type Foo = '12_3__45___67________'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '12_3__45___67________'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('number only w/o tailing', () => {
    //   type Foo = '12_3__45___67________'
    //   type T1 = SnakeToCamel<Foo, '_', true, true>
    //   type ExpectType = '12_3__45___67'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('number only one with tailing', () => {
      type Foo = '1__'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '1__'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('number only one w/o tailing', () => {
    //   type Foo = '1__'
    //   type T1 = SnakeToCamel<Foo, '_', true, true>
    //   type ExpectType = '1'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under 1', () => {
      type Foo = '_tb_user'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '_tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('leading ', () => {
      type Foo = '__tb_user'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '__tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('leading with TrimStart:false', () => {
    //   type Foo = '__tb_user'
    //   type T1 = SnakeToCamel<Foo, '_', false>
    //   type ExpectType = '__tbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    // it('leading with TrimStart:true', () => {
    //   type Foo = '__tb_user'
    //   type T1 = SnakeToCamel<Foo, '_', true>
    //   type ExpectType = 'tbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('mix', () => {
      type Foo = '-__tb_user'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '-TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('mix with TrimStart:true', () => {
    //   type Foo = '-__tb_user'
    //   type T1 = SnakeToCamel<Foo, '_', true>
    //   type ExpectType = '-TbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('mix2', () => {
      type Foo = '-__tb_user'
      type T1 = SnakeToCamel<Foo, '-' | '_'>
      type ExpectType = '-__tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('mix2a', () => {
      type Foo = '-__tb_user'
      type T1 = SnakeToCamel<SnakeToCamel<Foo, '_'>, '-'>
      type ExpectType = '-TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('mix2 with TrimStart:true', () => {
    //   type Foo = '-__tb_user'
    //   type T1 = SnakeToCamel<Foo, '-' | '_', true>
    //   type ExpectType = 'tbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    // it('mix2a with TrimStart:true', () => {
    //   type Foo = '-__tb_user'
    //   type T1 = SnakeToCamel<SnakeToCamel<Foo, '-', true>, '_', true>
    //   type ExpectType = 'tbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    // it('mix2 with TrimStart:true, TrimEnd:false', () => {
    //   type Foo = '-__tb_user__'
    //   type T1 = SnakeToCamel<Foo, '-' | '_', true, false>
    //   type ExpectType = 'tbUser__'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    // it('mix2 with TrimStart:true, TrimEnd:true', () => {
    //   type Foo = '-__tb_user__'
    //   type T1 = SnakeToCamel<Foo, '-' | '_', true, true>
    //   type ExpectType = 'tbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('leading delimiter', () => {
      type Foo = '___tb_user_2good'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '___tbUser_2good'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('leading delimiter with TrimStart:true', () => {
    //   type Foo = '___tb_user_2good_'
    //   type T1 = SnakeToCamel<Foo, '_', true>
    //   type ExpectType = 'tbUser_2good_'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under more with tailing', () => {
      type Foo = 'tb______user__________'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUser__________'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under more  TrimEnd:true', () => {
    //   type Foo = 'tb______user_3__________'
    //   type T1 = SnakeToCamel<Foo, '_', false, true>
    //   type ExpectType = 'tbUser_3'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under more 2 with tailing', () => {
      type Foo = '_______________tb______user__________'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '_______________tbUser__________'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under more 2 TrimEnd:true', () => {
    //   type Foo = '_______________tb______user__________'
    //   type T1 = SnakeToCamel<Foo, '_', false, true>
    //   type ExpectType = '_______________tbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under only', () => {
      type Foo = '___'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '___'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under only with TrimStart:true', () => {
    //   type Foo = '___'
    //   type T1 = SnakeToCamel<Foo, '_', true>
    //   type ExpectType = ''
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under number', () => {
      type Foo = '_67'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '_67'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under number with TrimStart:true', () => {
    //   type Foo = '_67'
    //   type T1 = SnakeToCamel<Foo, '_', true>
    //   type ExpectType = '67'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('trailing delimiter with tailing', () => {
      type Foo = 't_'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 't_'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('trailing delimiter TrimEnd:true', () => {
    //   type Foo = 't_'
    //   type T1 = SnakeToCamel<Foo, '_', false, true>
    //   type ExpectType = 't'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('number mix _', () => {
      type Foo = 'vi_001_23_user_4'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'vi_001_23User_4'
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should SnakeToCamel work with -', () => {
    it('normal', () => {
      type Foo = 'tb-user'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = 'tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('two', () => {
      type Foo = 'tb-user-two'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = 'tbUserTwo'
      const ret: Equals<T1, ExpectType> = true
    })

    it('three', () => {
      type Foo = 'tb-user-two-three'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = 'tbUserTwoThree'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake', () => {
      type Foo = 'tb-user-tWo-ThreE'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = 'tbUserTWoThreE'
      const ret: Equals<T1, ExpectType> = true
    })

    it('minus 1', () => {
      type Foo = '-tb-user'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '-tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('minus 2', () => {
      type Foo = '--tb-user'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '--tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('minus more', () => {
      type Foo = '-----tb-----user-----'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '-----tbUser-----'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under minus', () => {
      type Foo = '___---'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '___---'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under minus TrimStart:true, TrimEnd:true', () => {
    //   type Foo = '___---'
    //   type T1 = SnakeToCamel<Foo, '-', true, true>
    //   type ExpectType = '___'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under number', () => {
      type Foo = '-67'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '-67'
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should SnakeToCamel work with u', () => {
    it('normal', () => {
      type Foo = 'tb_user'
      type T1 = SnakeToCamel<Foo, 'u'>
      type ExpectType = 'tb_Ser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('string', () => {
      type Foo = 'tbuser'
      type T1 = SnakeToCamel<Foo, 'u'>
      type ExpectType = 'tbSer'
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should SnakeToCamel work with string', () => {
    it('should never', () => {
      type Foo = 'tb_user'
      type T1 = SnakeToCamel<Foo, string>
      type ExpectType = never
      const ret: Equals<T1, ExpectType> = true
    })
  })
})

