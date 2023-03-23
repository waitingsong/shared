import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { camelKeys } from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should CamelKeys work', () => {
    it('interface', () => {
      const TbUser = {
        user_id: 1,
        user_2_address: 'ab',
        user_2__3_address: 'abc',
        user_3foo: 23n,
        3322: true,
        json: {
          user_name: 'abc',
        },
      }
      const T1 = camelKeys(TbUser)
      const ExpectType = {
        userId: 1,
        user_2Address: 'ab',
        user_2__3Address: 'abc',
        user_3foo: 23n,
        3322: true,
        json: {
          user_name: 'abc',
        },
      }
      assert.deepEqual(T1, ExpectType)
    })

    it('class', () => {
      class TbUser {
        user_id = 1
        user_2_address = 'ab'
        user_2__3_address = 'abc'
        user_3foo = 23n
        3322 = true
        json = {
          user_name: 'abc',
        }
      }
      const T1 = camelKeys(new TbUser())
      const ExpectType = {
        userId: 1,
        user_2Address: 'ab',
        user_2__3Address: 'abc',
        user_3foo: 23n,
        3322: true,
        json: {
          user_name: 'abc',
        },
      }
      assert.deepEqual(T1, ExpectType)
    })

    it('string', () => {
      try {
        camelKeys('tb_user_detail')
      }
      catch (ex) {
        return
      }
      assert(false, 'should throw error')
    })

    it('number', () => {
      try {
        camelKeys(123)
      }
      catch (ex) {
        return
      }
      assert(false, 'should throw error')
    })
  })


  describe('should CamelKeys work recursive:true', () => {
    it('interface', () => {
      const Foo = {
        tb_user: {
          user_id: 1,
          user_2_address: 'ab',
          user_2__3_address: 'abc',
          user_3foo: 23n,
          3322: true,
          json: {
            user_name: 'abc',
          },
        },
        tb_order: {
          order_id: '1',
          total: 12,
          json: {
            user_name: 'abc',
          },
        },
      }
      const T1 = camelKeys(Foo, '_', true)
      const ExpectType = {
        tbUser: {
          userId: 1,
          user_2Address: 'ab',
          user_2__3Address: 'abc',
          user_3foo: 23n,
          3322: true,
          json: {
            userName: 'abc',
          },
        },
        tbOrder: {
          orderId: '1',
          total: 12,
          json: {
            userName: 'abc',
          },
        },
      }
      assert.deepEqual(T1, ExpectType)
    })

    it('class', () => {
      class Foo {
        tb_user = {
          user_id: 1,
          user_2_address: 'ab',
          user_2__3_address: 'abc',
          user_3foo: 23n,
          3322: true,
          json: {
            user_name: 'abc',
          },
        }

        tb_order = {
          order_id: '1',
          total: 12,
          json: {
            user_name: 'abc',
          },
        }
      }
      const T1 = camelKeys(new Foo(), '_', true)
      const ExpectType = {
        tbUser: {
          userId: 1,
          user_2Address: 'ab',
          user_2__3Address: 'abc',
          user_3foo: 23n,
          3322: true,
          json: {
            userName: 'abc',
          },
        },

        tbOrder: {
          orderId: '1',
          total: 12,
          json: {
            userName: 'abc',
          },
        },
      }
      assert.deepEqual(T1, ExpectType)
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

