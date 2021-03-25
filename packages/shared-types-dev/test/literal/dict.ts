import { SnakeToCamel } from '@waiting/shared-types'


export declare function genDbDict<D>(): DbDict<D>

export interface DbDict<D> {
  aliasColumns: DbTablesAliasCols<D>
  scopedColumns: DbScopedTablesCols<D>
}


export type DbScopedTablesCols<D> = {
  [TbName in keyof D]: ScopedTableFields<TbName & string, keyof D[TbName] & string>
}
export type ScopedTableFields<T extends string, K extends string> = {
  [FldName in K]: `${T}.${FldName}`
}

export type DbTablesAliasCols<D> = {
  [tbName in keyof D]: TableAliasCols<D[tbName], tbName & string>
}
export type TableAliasCols<T, TbName extends string> = {
  [K in keyof T as `${SnakeToCamel<TbName>}${Capitalize<K & string>}`]: `${TbName}.${K & string}`
}

