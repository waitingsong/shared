
export class Db {
  tb_user: UserDo
  tb_user_ext: UserExtDo
}


export class UserDo {
  uid: number
  name: string
  ctime: Date | string
}

export class UserExtDo {
  uid: number
  age: number
  address: string
}

