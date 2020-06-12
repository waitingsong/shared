
export interface Alias {
  uid: 'tbUserUid'
  name: 'tbUserName'
  [k: string]: string
}

interface AliasWithoutSign {
  uid: 'tbUserUid'
  name: 'tbUserName'
}
export type AliasRecord = Pick<AliasWithoutSign, keyof AliasWithoutSign>

interface Alias2 {
  uid: 'tbUserUid'
  name: 'tbUserName'
  foo: 'tbUserUid' // <-- duplicate value tbUserUid
}
export type AliasRecord2 = Pick<Alias2, keyof Alias2>


export const alias = {
  uid: 'tbUserUid',
  name: 'tbUserName',
} as const

export const alias2 = {
  uid: 'tbUserUid',
  name: 'tbUserName',
  foo: 'tbUserUid', // <-- duplicate value tbUserUid
} as const

