/* eslint-disable @typescript-eslint/no-explicit-any */

// ref: https://github.com/microsoft/TypeScript/pull/40336#issuecomment-684122600

type V = string | number | boolean | bigint

export type StrSplit<S extends string, D extends string> =
  string extends S ? string[] :
    S extends `${infer T}${D}${infer U}` ? [T, ...StrSplit<U, D>] :
      [S]

export type TupleJoin<T extends V[], D extends string> =
  T extends [] ? '' :
    // @ts-expect-error
    T extends [unknown] ? `${T[0]}`:
      // @ts-expect-error
      T extends [unknown, ...infer U] ? `${T[0]}${D}${TupleJoin<U, D>}` :
        string

// export type StrJoin<T extends V[], D extends string> =
//   T extends [] ? '' :
//     T extends [V] ? `${T[0]}`: `${T[0]}${D}${StrJoin<TupleTail<T>, D>}`

type FormatCapitalize<T extends unknown[]> =
  T extends [] ? [] :
    T extends [string] ? [`${Capitalize<T[0]>}`] :
      T extends [string, ...infer U] ? [`${Capitalize<T[0]>}`, ...FormatCapitalize<U>] : []

type FormatCamelCase<T extends unknown[]> =
    T extends [] ? [] :
      T extends [unknown] ? [T[0]] :
        T extends [unknown, ...infer U] ? [T[0], ...FormatCapitalize<U>] : []

export type SnakeToCamel<T extends string, D extends string = '_' | '-'> = TupleJoin<FormatCamelCase<StrSplit<T, D>>, ''>
export type SnakeToPascal<T extends string, D extends string = '_' | '-'> = TupleJoin<FormatCapitalize<StrSplit<T, D>>, ''>

