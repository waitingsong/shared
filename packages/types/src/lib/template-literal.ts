/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

// ref: https://github.com/microsoft/TypeScript/pull/40336#issuecomment-684122600


export type StrSplit<S extends string, D extends string> =
  string extends S ? string[] :
    S extends `${infer T}${D}${infer U}` ? [T, ...StrSplit<U, D>] :
      [S]

type V = string | number | boolean | bigint
export type TupleJoin<T extends V[], D extends string> =
  T extends [] ? '' :
    // @ts-ignore
    T extends [unknown] ? `${T[0]}` :
      // @ts-ignore
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

export type RecusiveCamelKeys<T> = {
  [K in keyof T as `${SnakeToCamel<K & string>}`]: T[K] extends Record<string, unknown>
    ? RecusiveCamelKeys<T[K]>
    : T[K]
}
export type RecusiveParscalKeys<T> = {
  [K in keyof T as `${SnakeToPascal<K & string>}`]: T[K] extends Record<string, unknown>
    ? RecusiveParscalKeys<T[K]>
    : T[K]
}

