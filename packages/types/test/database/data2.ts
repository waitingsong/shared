import { DbModel } from '../../src'


export interface Db extends DbModel {
  /**
   * @description 用户表
   * @table 表实际名称user
   */
  tb_user: User
  /**
   * @description 用户详情表
   * @table 表实际名称userDetail
   */
  tb_user_detail: UserDetail
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
  }
}

