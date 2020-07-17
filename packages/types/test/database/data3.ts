import { DbModel } from '../../src'


export interface Db extends DbModel {
  tb_user: User
  tb_user_detail: UserDetail
  tb_order: Order
}

/**
 * @description User用户表字段定义
 */
export interface User {
  uid: number
  name: string
  ctime: string | Date
}
export interface UserDetail {
  uid: number
  age: number
  address: string
  name: string
}
export interface Order {
  id: number
  sn: string
  uid: number
  address: string
  ctime: string
}

export interface UserAlias {
  tbUserUid: number
  tbUserName: string
  tbUserCtime: string | Date
}
export interface UserDetailAlias {
  tbUserDetailUid: number
  tbUserDetailAge: number
  tbUserDetailAddress: string
  tbUserDetailName: string
}

export interface InverseUserAlias {
  'tb_user.uid': number
  'tb_user.name': string
  'tb_user.ctime': string | Date
}
export interface InverseUserDetailAlias {
  'tb_user_detail.uid': number
  'tb_user_detail.age': string
  'tb_user_detail.address': string
  'tb_user_detail.name': string
}

export interface DbDict {
  tables: {
    tb_user: 'tb_user',
    tb_user_detail: 'tb_user_detail',
    tb_order: 'tb_order',
  }
  columns: {
    tb_user: {
      uid: 'uid',
      name: 'name',
      ctime: 'ctime',
    },
    tb_user_detail: {
      uid: 'uid',
      age: 'age',
      address: 'address',
    },
    tb_order: {
      id: 'id',
      uid: 'uid',
      sn: 'sn',
    },
  }
  scopedColumns: {
    tb_user: {
      uid: 'tb_user.uid',
      name: 'tb_user.name',
      ctime: 'tb_user.ctime',
    },
    tb_user_detail: {
      uid: 'tb_user_detail.uid',
      age: 'tb_user_detail.age',
      address: 'tb_user_detail.address',
      name: 'tb_user_detail.name',
    },
    tb_order: {
      id: 'tb_order.id',
      uid: 'tb_order.uid',
      sn: 'tb_order.sn',
    },
  }
  aliasColumns: {
    tb_user: {
      uid: {
        tbUserUid: 'tb_user.uid',
      },
      name: {
        tbUserName: 'tb_user.name',
      },
      ctime: {
        tbUserCtime: 'tb_user.ctime',
      },
    },
    tb_user_detail: {
      uid: {
        tbUserDetailUid: 'tb_user_detail.uid',
      },
      age: {
        tbUserDetailAge: 'tb_user_detail.age',
      },
      address: {
        tbUserDetailAddress: 'tb_user_detail.address',
      },
      name: {
        tbUserDetailName: 'tb_user_detail.name',
      },
    },
    tb_order: {
      id: {
        tbOrderId: 'tb_order.id',
      },
      uid: {
        tbOrderUid: 'tb_order.uid',
      },
      sn: {
        tbOrderSn: 'tb_order.sn',
      },
    },
  }
}

