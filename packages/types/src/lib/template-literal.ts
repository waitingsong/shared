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

// type FormatCapitalize<T extends unknown[]> =
//   T extends [] ? [] :
//     T extends [string] ? [`${Capitalize<T[0]>}`] :
//       T extends [string, ...infer U] ? [`${Capitalize<T[0]>}`, ...FormatCapitalize<U>] : []

// type FormatCamelCase<T extends unknown[]> =
//     T extends [] ? [] :
//       T extends [unknown] ? [T[0]] :
//         T extends [unknown, ...infer U] ? [T[0], ...FormatCapitalize<U>] : []

// export type SnakeToCamel<T extends string, D extends string = '_' | '-'> = TupleJoin<FormatCamelCase<StrSplit<T, D>>, ''>
// export type SnakeToPascal<T extends string, D extends string = '_' | '-'> = TupleJoin<FormatCapitalize<StrSplit<T, D>>, ''>

export type RecusiveCamelKeys<T> = {
  [K in keyof T as `${SnakeToCamel<K & string>}`]: T[K] extends Record<string, unknown>
    ? RecusiveCamelKeys<T[K]>
    : T[K]
}
export type RecusivePascalKeys<T> = {
  [K in keyof T as `${SnakeToPascal<K & string>}`]: T[K] extends Record<string, unknown>
    ? RecusivePascalKeys<T[K]>
    : T[K]
}

export type RecordCamelKeys<T, D extends string = '_' | '-'> = {
  [K in keyof T as `${SnakeToCamel<K & string, D>}`]: T[K]
}
export type RecordPascalKeys<T, D extends string = '_' | '-'> = {
  [K in keyof T as `${SnakeToPascal<K & string, D>}`]: T[K]
}



export type CamelToSnake<T extends string> = T extends `_${infer U}`
  ? `_${_CamelToSnake<U>}`
  : _CamelToSnake<T> extends `_${infer U}` ? U : _CamelToSnake<T>
type _CamelToSnake<T extends string> = T extends `${infer U}${infer Rest}`
  ? U extends '_'
    ? `${U}${_CamelToSnake<Rest>}`
    : Uppercase<U> extends U
      ? `_${Lowercase<U>}${_CamelToSnake<Rest>}`
      : `${U}${_CamelToSnake<Rest>}`
  : Lowercase<T>

export type RecusiveSnakeKeys<T> = {
  [K in keyof T as `${CamelToSnake<K & string>}`]: T[K] extends Record<string, unknown>
    ? RecusiveSnakeKeys<T[K]>
    : T[K]
}


export type SnakeToCamel<T extends string, D extends string = '_'> = T extends `${D}${infer R}`
  ? `${D}${SnakeToCamel<R, D>}`
  : T extends `${infer R}${D}`
    ? `${SnakeToCamel<R, D>}${D}`
    : _SnakeToCamel<T, D>

type _SnakeToCamel<T extends string, D extends string> = T extends `${infer U}${infer R}`
  ? U extends D
    ? R extends D
      ? `${D}${D}`
      : R extends `${D}${string}`
        ? `${D}${_SnakeToCamel<R, D>}`
        : `${_SnakeToCamel<Capitalize<R>, D>}`
    : `${U}${_SnakeToCamel<R, D>}`
  : T


export type SnakeToPascal<T extends string, D extends string = '_'> = T extends `${D}${infer R}`
  ? `${D}${Capitalize<SnakeToPascal<R, D>>}`
  : T extends `${infer R}${D}`
    ? `${SnakeToPascal<Capitalize<R>, D>}${D}`
    : _SnakeToCamel<Capitalize<T>, D>

