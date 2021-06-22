import {
  basename,
  camelCaseKeys,
} from '../src/index'


// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe.only(filename, () => {

  describe('should camelCaseKeys work', () => {
    it('normal', () => {
      const Foo = 'F'
      const F1 = {
        tb_user_2: Foo,
        '3tb_user_2': Foo,
      }
      const T1 = camelCaseKeys(F1)
      const ExpectType = {
        tbUser2: Foo,
        '3tbUser2': Foo,
      }
      assert.deepStrictEqual(T1, ExpectType)
    })

    it('merge tb_user_2 and tb_user2', () => {
      const Foo = 'F'
      const F1 = {
        tb_user_2: Foo,
        tb_user2: Foo,
      }
      const T1 = camelCaseKeys(F1)
      const ExpectType = {
        tbUser2: Foo,
      }
      assert.deepStrictEqual(T1, ExpectType)
    })

    it('merge more', () => {
      const Foo = 'F'
      const F1 = {
        tb_user_2: Foo,
        tb_user2: Foo,
        '3tb_user_2': Foo,
        '3tb_user2': Foo,
      }
      const T1 = camelCaseKeys(F1)
      const ExpectType = {
        tbUser2: Foo,
        '3tbUser2': Foo,
      }
      assert.deepStrictEqual(T1, ExpectType)
    })


  })

})

