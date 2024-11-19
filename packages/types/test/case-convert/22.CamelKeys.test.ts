import { fileShortPath } from '@waiting/shared-core'

import type {
  CamelKeys,
  Equals,
} from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should CamelKeys work', () => {
    it('interface', () => {
      interface TbUser {
        user_id: number
        user_2_address: string
        user_2__3_address: string
        user_3foo: bigint
        3322: boolean
        json: {
          user_name: 'abc',
        }
      }
      type T1 = CamelKeys<TbUser>
      interface ExpectType {
        userId: number
        user_2Address: string
        user_2__3Address: string
        user_3foo: bigint
        3322: boolean
        json: {
          user_name: 'abc',
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })

    it('class', () => {
      class TbUser {

        user_id: number
        user_2_address: string
        user_2__3_address: string
        user_3foo: bigint
        '3322': boolean
        json: {
          user_name: 'abc',
        }

      }
      type T1 = CamelKeys<TbUser>
      interface ExpectType {
        userId: number
        user_2Address: string
        user_2__3Address: string
        user_3foo: bigint
        3322: boolean
        json: {
          user_name: 'abc',
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })

    it('string', () => {
      type T1 = CamelKeys<'tb_user_detail'>
      type ExpectType = never
      const ret: Equals<T1, ExpectType> = true
    })

    it('number', () => {
      type T1 = CamelKeys<123>
      type ExpectType = never
      const ret: Equals<T1, ExpectType> = true
    })
  })


  describe('should CamelKeys work recursive:true', () => {
    it('interface', () => {
      interface Foo {
        tb_user: {
          user_id: number,
          user_2_address: string,
          user_2__3_address: string,
          user_3foo: bigint,
          3322: boolean,
          json: {
            user_name: 'abc',
          },
        }
        tb_order: {
          order_id: string,
          total: number,
          json: {
            user_name: 'abc',
          },
        }
      }
      type T1 = CamelKeys<Foo, '_', true>
      interface ExpectType {
        tbUser: {
          userId: number,
          user_2Address: string,
          user_2__3Address: string,
          user_3foo: bigint,
          3322: boolean,
          json: {
            userName: 'abc',
          },
        }
        tbOrder: {
          orderId: string,
          total: number,
          json: {
            userName: 'abc',
          },
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })

    it('class', () => {
      class Foo {

        tb_user: {
          user_id: number,
          user_2_address: string,
          user_2__3_address: string,
          user_3foo: bigint,
          3322: boolean,
          json: {
            user_name: 'abc',
          },
        }

        tb_order: {
          order_id: string,
          total: number,
          json: {
            user_name: 'abc',
          },
        }

      }
      type T1 = CamelKeys<Foo, '_', true>
      class ExpectType {

        tbUser: {
          userId: number,
          user_2Address: string,
          user_2__3Address: string,
          user_3foo: bigint,
          3322: boolean,
          json: {
            userName: 'abc',
          },
        }

        tbOrder: {
          orderId: string,
          total: number,
          json: {
            userName: 'abc',
          },
        }

      }
      const ret: Equals<T1, ExpectType> = true
    })
  })



  // describe('should RecordSnakeKeys work', () => {
  //   it('interface', () => {
  //     interface TbUser {
  //       userId: number
  //       User_2Address: string
  //       User_2__3Address: string
  //       user_3foo: bigint
  //       '3322': boolean
  //       json: {
  //         user_name: 'abc',
  //       }
  //     }
  //     type T1 = RecordSnakeKeys<TbUser>
  //     interface ExpectType {
  //       user_id: number
  //       user_2_address: string
  //       user_2__3_address: string
  //       user_3foo: bigint
  //       '3322': boolean
  //       json: {
  //         user_name: 'abc',
  //       }
  //     }
  //     const ret: Equals<T1, ExpectType> = true
  //   })
  // })

})

