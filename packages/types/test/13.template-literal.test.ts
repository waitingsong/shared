import {
  Equals,
  SnakeToCamel,
  SnakeToPascal,
  RecusiveCamelKeys,
  RecusiveParscalKeys,
  RecordCamelKeys,
  RecordParscalKeys,
} from '../src/index'

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
      type T1 = RecusiveParscalKeys<Foo>
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
      type T1 = RecusiveParscalKeys<Foo>
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
      type T1 = RecordParscalKeys<TbUser>
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

