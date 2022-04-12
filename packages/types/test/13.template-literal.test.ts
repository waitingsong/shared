import assert from 'assert/strict'

import {
  Equals,
  SnakeToCamel,
  SnakeToPascal,
  RecusiveCamelKeys,
  RecusivePascalKeys,
  RecordCamelKeys,
  RecordPascalKeys,
} from '../src/index'


describe('13.template-literal.test.ts', () => {

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

    it('number', () => {
      type Foo = 'tb_user_2_good'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tbUser2Good'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under 1', () => {
      type Foo = '_tb_user'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '_tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under 2', () => {
      type Foo = '__tb_user'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '__tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('mix', () => {
      type Foo = '-__tb_user'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '-_TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('leading delimiter', () => {
      type Foo = '___tb_user_2good'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '___tbUser2good'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under more', () => {
      type Foo = 'tb______user__________'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 'tb_____User__________'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under more', () => {
      type Foo = '_______________tb______user__________'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '_______________tb_____User__________'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under only', () => {
      type Foo = '___'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '___'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under number', () => {
      type Foo = '_67'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = '_67'
      const ret: Equals<T1, ExpectType> = true
    })

    it('trailing delimiter', () => {
      type Foo = 't_'
      type T1 = SnakeToCamel<Foo>
      type ExpectType = 't_'
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
      type Foo = 'tb-user-tWo-threE'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = 'tbUserTWoThreE'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under 1', () => {
      type Foo = '-tb-user'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '-tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under 2', () => {
      type Foo = '--tb-user'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '--tbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under more', () => {
      type Foo = '-----tb-----user-----'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '-----tb----User-----'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under only', () => {
      type Foo = '___---'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '___---'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under number', () => {
      type Foo = '-67'
      type T1 = SnakeToCamel<Foo, '-'>
      type ExpectType = '-67'
      const ret: Equals<T1, ExpectType> = true
    })
  })

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

    it('number', () => {
      type Foo = 'tb_user_2_good'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'TbUser2Good'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under 1', () => {
      type Foo = '_tb_user'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '_TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under 2', () => {
      type Foo = '__tb_user'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '__TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('mix', () => {
      type Foo = '-__tb_user'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '-_TbUser'
      const ret: Equals<T1, ExpectType> = true
    })

    it('leading delimiter', () => {
      type Foo = '___tb_user_2good'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '___TbUser2good'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under more', () => {
      type Foo = 'tb______user__________'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'Tb_____User__________'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under more', () => {
      type Foo = '_______________tb______user__________'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '_______________Tb_____User__________'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under only', () => {
      type Foo = '___'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '___'
      const ret: Equals<T1, ExpectType> = true
    })

    it('under number', () => {
      type Foo = '_67'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = '_67'
      const ret: Equals<T1, ExpectType> = true
    })

    it('trailing delimiter', () => {
      type Foo = 't_'
      type T1 = SnakeToPascal<Foo>
      type ExpectType = 'T_'
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should RecusiveCamelKeys work', () => {
    it('interface', () => {
      interface Foo {
        tb_user: {
          user_id: number,
          user_2_address: string,
          user_3foo: bigint,
          '3322': boolean,
        }
        tb_order: {
          order_id: string,
          total: number,
        }
      }
      type T1 = RecusiveCamelKeys<Foo>
      interface ExpectType {
        tbUser: {
          userId: number,
          user2Address: string,
          user3foo: bigint,
          '3322': boolean,
        }
        tbOrder: {
          orderId: string,
          total: number,
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })

    it('interface 2', () => {
      interface Foo {
        tb_user: {
          user_id: number,
          user_2_address: string,
          user_3foo: bigint,
          '3322': boolean,
        }
      }
      type T1 = RecusiveCamelKeys<Foo>
      interface ExpectType {
        tbUser: {
          userId: string,
          user2Address: string,
          user3foo: bigint,
          '3322': boolean,
        }
      }
      const ret: Equals<T1, ExpectType> = false
    })
  })


  describe('should RecusiveParscalKeys work', () => {
    it('interface', () => {
      interface Foo {
        tb_user: {
          user_id: number,
          user_2_address: string,
          user_3foo: bigint,
          '3322': boolean,
        }
        tb_order: {
          order_id: string,
          total: number,
        }
      }
      type T1 = RecusivePascalKeys<Foo>
      interface ExpectType {
        TbUser: {
          UserId: number,
          User2Address: string,
          User3foo: bigint,
          '3322': boolean,
        }
        TbOrder: {
          OrderId: string,
          Total: number,
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })

    it('interface 2', () => {
      interface Foo {
        tb_user: {
          user_id: number,
          user_2_address: string,
          user_3foo: bigint,
          '3322': boolean,
        }
      }
      type T1 = RecusivePascalKeys<Foo>
      interface ExpectType {
        TbUser: {
          UserId: string,
          User2Address: string,
          User3foo: bigint,
          '3322': boolean,
        }
      }
      const ret: Equals<T1, ExpectType> = false
    })
  })


  describe('should RecordCamelKeys work', () => {
    it('interface', () => {
      interface TbUser {
        user_id: number
        user_2_address: string
        user_3foo: bigint
        '3322': boolean
        json: {
          user_name: 'abc',
        }
      }
      type T1 = RecordCamelKeys<TbUser>
      interface ExpectType {
        userId: number
        user2Address: string
        user3foo: bigint
        '3322': boolean
        json: {
          user_name: 'abc',
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })
  })


  describe('should RecordParscalKeys work', () => {
    it('interface', () => {
      interface TbUser {
        user_id: number
        user_2_address: string
        user_3foo: bigint
        '3322': boolean
        json: {
          user_name: 'abc',
        }
      }
      type T1 = RecordPascalKeys<TbUser>
      interface ExpectType {
        UserId: number
        User2Address: string
        User3foo: bigint
        '3322': boolean
        Json: {
          user_name: 'abc',
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })
  })

})

