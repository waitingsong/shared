import { fileShortPath } from '@waiting/shared-core'

import type {
  Equals,
  PascalKeys,
} from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should PascalKeys work', () => {
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
      type T1 = PascalKeys<TbUser>
      interface ExpectType {
        UserId: number
        User_2Address: string
        User_2__3Address: string
        User_3foo: bigint
        3322: boolean
        Json: {
          user_name: 'abc',
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should PascalKeys work Recursive:true', () => {
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
      type T1 = PascalKeys<Foo, '_', true>
      interface ExpectType {
        TbUser: {
          UserId: number,
          User_2Address: string,
          User_2__3Address: string,
          User_3foo: bigint,
          3322: boolean,
          Json: {
            UserName: 'abc',
          },
        }
        TbOrder: {
          OrderId: string,
          Total: number,
          Json: {
            UserName: 'abc',
          },
        }
      }
      const ret: Equals<T1, ExpectType> = true
    })

    it('interface 2', () => {
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
      }
      type T1 = PascalKeys<Foo>
      interface ExpectType {
        TbUser: {
          UserId: string,
          User2Address: string,
          User23Address: string,
          User3foo: bigint,
          3322: boolean,
          Json: {
            UserName: 'abc',
          },
        }
      }
      const ret: Equals<T1, ExpectType> = false
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

