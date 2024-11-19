import { fileShortPath } from '@waiting/shared-core'

import type {
  DbScopedColsByKey,
  DbScopedColsByTableType,
  Equals,
} from '../../src/index.js'

import type { Db, DbOrder, DbUser, DbUserExt, OrderDO, UserDO } from './test.model.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should DbScopedFiles work ', () => {
    it('DbUser', () => {
      type T1 = DbScopedColsByKey<DbUser>
      type ExpectType = 'tb_user.uid' | 'tb_user.name' | 'tb_user.real_name' | 'tb_user.ctime'
      const ret: Equals<T1, ExpectType> = true
    })

    it('DbUserExt', () => {
      type T1 = DbScopedColsByKey<DbUserExt>
      type ExpectType = 'tb_user_ext.uid' | 'tb_user_ext.age' | 'tb_user_ext.address'
      const ret: Equals<T1, ExpectType> = true
    })

    it('DbOrder', () => {
      type T1 = DbScopedColsByKey<DbOrder>
      type ExpectType = 'tb_order.order_id' | 'tb_order.order_name' | 'tb_order.uid' | 'tb_order.ctime'
      const ret: Equals<T1, ExpectType> = true
    })

    it('Db', () => {
      type T1 = DbScopedColsByKey<Db>
      type ExpectType = 'tb_user.uid' | 'tb_user.name' | 'tb_user.real_name' | 'tb_user.ctime'
        | 'tb_user_ext.uid' | 'tb_user_ext.age' | 'tb_user_ext.address'
        | 'tb_order.order_id' | 'tb_order.order_name' | 'tb_order.uid' | 'tb_order.ctime'
      const ret: Equals<T1, ExpectType> = true
    })

    it('Db part 1', () => {
      type T1 = DbScopedColsByKey<Db, 'tb_user'>
      type ExpectType = 'tb_user.uid' | 'tb_user.name' | 'tb_user.real_name' | 'tb_user.ctime'
      const ret: Equals<T1, ExpectType> = true
    })

    it('Db part 2', () => {
      type T1 = DbScopedColsByKey<Db, 'tb_user' | 'tb_user_ext'>
      type ExpectType = 'tb_user.uid' | 'tb_user.name' | 'tb_user.real_name' | 'tb_user.ctime'
        | 'tb_user_ext.uid' | 'tb_user_ext.age' | 'tb_user_ext.address'
      const ret: Equals<T1, ExpectType> = true
    })
  })

  describe('should DbScopedFilesByTableType work', () => {
    it('all', () => {
      type T1 = DbScopedColsByTableType<Db>
      type ExpectType = 'tb_user.uid' | 'tb_user.name' | 'tb_user.real_name' | 'tb_user.ctime'
        | 'tb_user_ext.uid' | 'tb_user_ext.age' | 'tb_user_ext.address'
        | 'tb_order.order_id' | 'tb_order.order_name' | 'tb_order.uid' | 'tb_order.ctime'
      const ret: Equals<T1, ExpectType> = true
    })
    it('UserDO', () => {
      type T1 = DbScopedColsByTableType<Db, UserDO>
      type ExpectType = 'tb_user.uid' | 'tb_user.name' | 'tb_user.real_name' | 'tb_user.ctime'
      const ret: Equals<T1, ExpectType> = true
    })
    it('UserDO | OrderDO', () => {
      type T1 = DbScopedColsByTableType<Db, UserDO | OrderDO>
      type ExpectType = 'tb_user.uid' | 'tb_user.name' | 'tb_user.real_name' | 'tb_user.ctime'
        | 'tb_order.order_id' | 'tb_order.order_name' | 'tb_order.uid' | 'tb_order.ctime'
      const ret: Equals<T1, ExpectType> = true
    })
  })
})

