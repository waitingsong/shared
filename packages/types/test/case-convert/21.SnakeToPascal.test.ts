import { fileShortPath } from '@waiting/shared-core'

import type {
  Equals,
  SnakeToPascal,
} from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should SnakeToPascal work with _', () => {
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
      type Foo = 'tb_user_two_Three'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUserTwoThree'
      const ret: Equals<T1, ExpectType> = true
    })

    it('non standard snake', () => {
      type Foo = 'tb_user_tWo_ThreE'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUserTWoThreE'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number', () => {
      type Foo = 'tb_user_2_good'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUser_2Good'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number only', () => {
      type Foo = '12_3__45___67'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '12_3__45___67'
      const ret: Equals<T1, ExpectType> = true
    })

    it('number only with tailing', () => {
      type Foo = '12_3__45___67________'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '12_3__45___67________'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('number only TrimEnd:true', () => {
    //   type Foo = '12_3__45___67________'
    //   type T1 = SnakeToPascal<Foo, '_', false, true>
    //   type ExpectType = '1234567'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('number only one with tailing', () => {
      type Foo = '1__'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '1__'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('number only one TrimEnd:true', () => {
    //   type Foo = '1__'
    //   type T1 = SnakeToPascal<Foo, '_', false, true>
    //   type ExpectType = '1'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under 1', () => {
      type Foo = '_tb_user'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '_TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('leading ', () => {
      type Foo = '__tb_user'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '__TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('leading with TrimStart:false', () => {
    //   type Foo = '__tb_user'
    //   type T1 = SnakeToPascal<Foo, '_', false>
    //   type ExpectType = '__TbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    // it('leading with TrimStart:true', () => {
    //   type Foo = '__tb_user'
    //   type T1 = SnakeToPascal<Foo, '_', true>
    //   type ExpectType = 'TbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('mix', () => {
      type Foo = '-__tb_user'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '-TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('mix with TrimStart:true', () => {
    //   type Foo = '-__tb_user'
    //   type T1 = SnakeToPascal<Foo, '_', true>
    //   type ExpectType = '-TbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('mix2', () => {
      type Foo = '-__tb_user'
      type T1 = SnakeToPascal<Foo, '-' | '_'>
      type ExpectType = '-__TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('mix2 with TrimStart:true', () => {
    //   type Foo = '-__tb_user'
    //   type T1 = SnakeToPascal<Foo, '-' | '_', true>
    //   type ExpectType = 'TbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('leading delimiter', () => {
      type Foo = '___tb_user_2good'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '___TbUser_2good'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('leading delimiter with TrimStart:true', () => {
    //   type Foo = '___tb_user_2good'
    //   type T1 = SnakeToPascal<Foo, '_', true>
    //   type ExpectType = 'TbUser2good'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under more with tailing', () => {
      type Foo = 'tb______user__________'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUser__________'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under more TrimEnd:true', () => {
    //   type Foo = 'tb______user__________'
    //   type T1 = SnakeToPascal<Foo, '_', false, true>
    //   type ExpectType = 'TbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under more 2 with tailing', () => {
      type Foo = '_______________tb______user__________'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '_______________TbUser__________'
      const ret: Equals<T1, ExpectType> = true
    })
    // it('under more 2 TrimEnd:true', () => {
    //   type Foo = '_______________tb______user__________'
    //   type T1 = SnakeToPascal<Foo, '_', false, true>
    //   type ExpectType = '_______________TbUser'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under only', () => {
      type Foo = '___'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '___'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under only with TrimStart:true', () => {
    //   type Foo = '___'
    //   type T1 = SnakeToPascal<Foo, '_', true>
    //   type ExpectType = ''
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('under number', () => {
      type Foo = '_67'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '_67'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('under number with TrimStart:true', () => {
    //   type Foo = '_67'
    //   type T1 = SnakeToPascal<Foo, '_', true>
    //   type ExpectType = '67'
    //   const ret: Equals<T1, ExpectType> = true
    // })

    it('trailing delimiter with tailing', () => {
      type Foo = 't_'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'T_'
      const ret: Equals<T1, ExpectType> = true
    })

    // it('trailing delimiter TrimEnd:true', () => {
    //   type Foo = 't_'
    //   type T1 = SnakeToPascal<Foo, '_', false, true>
    //   type ExpectType = 'T'
    //   const ret: Equals<T1, ExpectType> = true
    // })
  })

})

