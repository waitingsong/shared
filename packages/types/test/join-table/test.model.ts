import type { RecordCamelKeys } from '@waiting/shared-types'


export class Db {

  tb_user: UserDO
  tb_user_ext: UserExtDO
  tb_order: OrderDO

}
export class DbUser {

  tb_user: UserDO

}
export class DbUserExt {

  tb_user_ext: UserExtDO

}
export class DbOrder {

  tb_order: OrderDO

}

export class UserDO {

  uid: number
  name: string
  real_name: string
  ctime: Date | 'now()'

}

export class UserExtDO {

  uid: number
  age: number
  address: string | number

}

export class OrderDO {

  order_id: string | bigint
  order_name: string
  uid: number
  ctime: Date | 'now()'

}

export type UserDTO = RecordCamelKeys<UserDO>

export interface Context {
  uid: number
  ver: string
}

