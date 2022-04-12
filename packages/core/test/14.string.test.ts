import assert from 'assert/strict'

import {
  basename,
  join,
  camelToSnakeCase,
  snakeToCamel, snakeToPascal,
} from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should snakeToCamel work', () => {
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
      const ExpectType = 'tbUser-tWoThreE'
      assert(T1 === ExpectType)
    })

    it('number', () => {
      const Foo = 'tb_user_2_good'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 'tbUser2Good'
      assert(T1 === ExpectType)
    })
    it('number follow', () => {
      const Foo = 'tb_user_2good'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 'tbUser2good'
      assert(T1 === ExpectType)
    })

    it('number first 1', () => {
      const Foo = '3_tb_user_2good'
      const T1 = snakeToCamel(Foo)
      const ExpectType = '3TbUser2good'
      assert(T1 === ExpectType)
    })

    it('number first 2', () => {
      const Foo = '3tb_user_2good'
      const T1 = snakeToCamel(Foo)
      const ExpectType = '3tbUser2good'
      assert(T1 === ExpectType)
    })

    it('leading delimiter', () => {
      const Foo = '___tb_user_2good'
      const T1 = snakeToCamel(Foo)
      const ExpectType = '___tbUser2good'
      assert(T1 === ExpectType, T1)
    })

    it('under more', () => {
      const Foo = '_______________tb______user__________'
      const T1 = snakeToCamel(Foo)
      const ExpectType = '_______________tb_____User__________'
      assert(T1 === ExpectType, T1)
    })

    it('trailing delimiter', () => {
      const Foo = 't_'
      const T1 = snakeToCamel(Foo)
      const ExpectType = 't_'
      assert(T1 === ExpectType, T1)
    })

    it('trailing delimiter', () => {
      const Foo = '___tb_user_2good___'
      const T1 = snakeToCamel(Foo)
      const ExpectType = '___tbUser2good___'
      assert(T1 === ExpectType, T1)
    })

    it('leading delimiter -', () => {
      const Foo = '___--tb-user-2good'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = '___-TbUser2good'
      assert(T1 === ExpectType)
    })
  })

  describe('should snakeToCamel work with delimiter -', () => {
    it('normal', () => {
      const Foo = 'tb-user'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 'tbUser'
      assert(T1 === ExpectType)
    })

    it('two', () => {
      const Foo = 'tb-user-two'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 'tbUserTwo'
      assert(T1 === ExpectType)
    })

    it('three', () => {
      const Foo = 'tb-user-two-three'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 'tbUserTwoThree'
      assert(T1 === ExpectType)
    })

    it('non standard snake', () => {
      const Foo = 'tb-user-tWo-threE'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 'tbUserTWoThreE'
      assert(T1 === ExpectType)
    })

    it('underline', () => {
      const Foo = 'tb-user_tWo-threE'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 'tbUser_tWoThreE'
      assert(T1 === ExpectType)
    })

    it('number', () => {
      const Foo = 'tb-user-2-good'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 'tbUser2Good'
      assert(T1 === ExpectType)
    })
    it('number follow', () => {
      const Foo = 'tb-user-2good'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 'tbUser2good'
      assert(T1 === ExpectType)
    })

    it('number first 1', () => {
      const Foo = '3-tb-user-2good'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = '3TbUser2good'
      assert(T1 === ExpectType)
    })

    it('number first 2', () => {
      const Foo = '3tb-user-2good'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = '3tbUser2good'
      assert(T1 === ExpectType)
    })

    it('leading delimiter', () => {
      const Foo = '---tb-user-2good'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = '---tbUser2good'
      assert(T1 === ExpectType, T1)
    })

    it('more delimiter', () => {
      const Foo = '---------tb---------user---------'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = '---------tb--------User---------'
      assert(T1 === ExpectType, T1)
    })

    it('trailing delimiter', () => {
      const Foo = 't-'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = 't-'
      assert(T1 === ExpectType, T1)
    })

    it('trailing delimiter', () => {
      const Foo = '___tb_user_2good___'
      const T1 = snakeToCamel(Foo)
      const ExpectType = '___tbUser2good___'
      const f22222222 = ' ___tbUser2good__'
      assert(T1 === ExpectType, T1)
    })

    it('leading delimiter -', () => {
      const Foo = '___--tb-user-2good'
      const T1 = snakeToCamel(Foo, '-')
      const ExpectType = '___-TbUser2good'
      assert(T1 === ExpectType)
    })
  })

  describe('should SnakeToPascal work', () => {
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
      const ExpectType = 'TbUser-tWoThreE'
      assert(T1 === ExpectType, T1)
    })

    it('number', () => {
      const Foo = 'tb_user_2_good'
      const T1 = snakeToPascal(Foo)
      const ExpectType = 'TbUser2Good'
      assert(T1 === ExpectType)
    })
    it('number follow', () => {
      const Foo = 'tb_user_2good'
      const T1 = snakeToPascal(Foo)
      const ExpectType = 'TbUser2good'
      assert(T1 === ExpectType)
    })

    it('number first 1', () => {
      const Foo = '3_tb_user_2good'
      const T1 = snakeToPascal(Foo)
      const ExpectType = '3TbUser2good'
      assert(T1 === ExpectType)
    })

    it('number first 2', () => {
      const Foo = '3tb_user_2good'
      const T1 = snakeToPascal(Foo)
      const ExpectType = '3tbUser2good'
      assert(T1 === ExpectType)
    })
  })

  describe('should camelToSnakeCase work', () => {
    it('normal', () => {
      const Foo = 'tbUser'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = 'tb_user'
      assert(T1 === ExpectType)
    })

    it('two', () => {
      const Foo = 'tbUserTwo'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = 'tb_user_two'
      assert(T1 === ExpectType)
    })

    it('three', () => {
      const Foo = 'tbUserTwoThree'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = 'tb_user_two_three'
      assert(T1 === ExpectType)
    })

    it('non standard snake', () => {
      const Foo = 'tbUserTWoThreE'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = 'tb_user_t_wo_thre_e'
      assert(T1 === ExpectType)
    })

    it('minus', () => {
      const Foo = 'tbUserTWoThreE'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = 'tb_user_t_wo_thre_e'
      assert(T1 === ExpectType)
    })

    it('number', () => {
      const Foo = 'tbUser2Good'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = 'tb_user_2_good'
      assert(T1 === ExpectType)
    })
    it('number follow', () => {
      const Foo = 'tbUser2good'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = 'tb_user_2good'
      assert(T1 === ExpectType)
    })

    it('number first 1', () => {
      const Foo = '3TbUser2good'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = '3_tb_user_2good'
      assert(T1 === ExpectType)
    })

    it('number first 2', () => {
      const Foo = '3tbUser2good'
      const T1 = camelToSnakeCase(Foo)
      const ExpectType = '3tb_user_2good'
      assert(T1 === ExpectType)
    })
  })
})

