import { fileShortPath } from '@waiting/shared-core'

import {
  Equals,
  SnakeKeys,
} from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should SnakeKeys work', () => {
    it('1', () => {
      interface Foo {
        tbUser: {
          userId: number,
          json: {
            userName: 'abc',
          },
        }
        tbOrder: {
          OrderId: string,
        }
      }
      type T1 = SnakeKeys<Foo>

      interface ExpectType {
        tb_user: {
          userId: number,
          json: {
            userName: 'abc',
          },
        }
        tb_order: {
          OrderId: string,
        }
      }

      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })

    it('string', () => {
      type T1 = SnakeKeys<'tbUserDetail'>
      type ExpectType = never
      const ret: Equals<T1, ExpectType> = true
    })

    it('number', () => {
      type T1 = SnakeKeys<123>
      type ExpectType = never
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should SnakeKeys work Recursive:true', () => {
    it('1', () => {
      interface Foo {
        tbUser: {
          userId: number,
          userNameExt: {
            _nameFoo: string,
            _NameBar: string,
          },
          UserAge: number,
          _NameBar: string,
          Json: {
            UserName: 'abc',
          },
        }
        tb_order: {
          OrderId: string,
          Json: {
            userName: 'abc',
          },
        }
      }
      type T1 = SnakeKeys<Foo, '_', true>

      // declare const f1: T1
      // const ff = f1.tb_user.json.userName

      interface ExpectType {
        tb_user: {
          user_id: number,
          user_name_ext: {
            _name_foo: string,
            __name_bar: string,
          },
          user_age: number,
          __name_bar: string,
          json: {
            user_name: 'abc',
          },
        }
        tb_order: {
          order_id: string,
          json: {
            user_name: 'abc',
          },
        }
      }

      const ret: Equals<T1, ExpectType> = true
      const ret2: Equals<T1, Foo> = false
    })
  })
})

