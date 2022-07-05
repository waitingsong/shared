import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { snakeKeys } from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should snakeKeys() work', () => {
    it('1', () => {
      const Foo = {
        tbUser: {
          userId: 1,
          json: {
            userName: 'abc',
          },
        },
        tbOrder: {
          OrderId: 'uuid',
        },
      }
      const T1 = snakeKeys(Foo)

      const ExpectType = {
        tb_user: {
          userId: 1,
          json: {
            userName: 'abc',
          },
        },
        tb_order: {
          OrderId: 'uuid',
        },
      }

      assert.deepEqual(T1, ExpectType)
    })

    it('string', () => {
      try {
        snakeKeys('tbUserDetail')
      }
      catch {
        return
      }
      assert(false, 'should throw error')
    })
  })

  describe('should snakeKeys() work Recursive:true', () => {
    it('1', () => {
      const Foo = {
        tbUser: {
          userId: 1,
          userNameExt: {
            _nameFoo: 'foo',
            _NameBar: 'bar',
          },
          UserAge: 7,
          _NameBar: '_bar',
          Json: {
            UserName: 'abc',
          },
        },
        tb_order: {
          OrderId: 123,
          Json: {
            userName: 'abc',
          },
        },
      }
      const T1 = snakeKeys(Foo, '_', true)
      // const ff = T1.tb_user.json.user_name

      const ExpectType = {
        tb_user: {
          user_id: 1,
          user_name_ext: {
            _name_foo: 'foo',
            __name_bar: 'bar',
          },
          user_age: 7,
          __name_bar: '_bar',
          json: {
            user_name: 'abc',
          },
        },
        tb_order: {
          order_id: 123,
          json: {
            user_name: 'abc',
          },
        },
      }

      assert.deepEqual(T1, ExpectType)
    })
  })
})

