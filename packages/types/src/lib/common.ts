/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */

// ref: https://zhuanlan.zhihu.com/p/38687656
// original ref: https://github.com/microsoft/typescript/pull/24897
// dependencies typescript >= 3.1
/**
 * @deprecated use `TupleHead` instead
 */
export type Head<Tuple extends any[]> = Tuple extends [infer H, ...any[]] ? H : never
/**
 * @deprecated use `TupleTail` instead
 */
export type Tail<Tuple extends any[]> = ((...x: Tuple) => void) extends ((h: any, ...rest: infer R) => void) ? R : never
/**
 * @deprecated use `TupleUnshift` instead
 */
export type Unshift<
  Tuple extends any[],
  Element> = ((h: Element, ...tuple: Tuple) => void) extends (...x: infer R) => void ? R : never
/**
 * @deprecated use `TupleLast` instead
 */
export type Last<Tuple extends any[]> = {
  1: Tuple[0],
  0: Last<Tail<Tuple>>,
}[Tuple extends [any] ? 1 : 0]

export type Reverse<Tuple extends any[]> = Reverse_<Tuple, []>
type Reverse_<Tuple extends any[], Result extends any[]> = {
  1: Result,
  0: Reverse_<Tail<Tuple>, Unshift<Result, Head<Tuple>>>,
}[Tuple extends [] ? 1 : 0]

export type ToTuple<T> = T extends any[] ? T : any[]
/**
 * @deprecated use `TuplePush` instead
 */
export type Push<
  Tuple extends any[],
  Element,
  R = Reverse<Tuple>,
  T extends any[] = ToTuple<R>
> = Reverse<Unshift<T, Element>>

/**
 * @deprecated use `TupleConcat` instead
 */
export type Concat<
  Tuple1 extends any[],
  Tuple2 extends any[],
  R = Reverse<Tuple1>, T extends any[] = ToTuple<R>> = Concat_<T, Tuple2>
type Concat_<Tuple1 extends any[], Tuple2 extends any[]> = {
  1: Reverse<Tuple1>,
  0: Concat_<Unshift<Tuple1, Head<Tuple2>>, Tail<Tuple2>>,
}[Tuple2 extends [] ? 1 : 0]

/**
 * Union tow types, with optional excluded keys
 * @example `Spread<T, K, 'foo'>` or `Spread<T, K, 'foo' | 'bar'>`
 * @see https://github.com/microsoft/TypeScript/pull/13288#issuecomment-412230721
 */
export type Spread<T1, T2, KeyExcludeOptinal = void>
  = { [K in Exclude<keyof T1, KeyExcludeOptinal | keyof T2>]: T1[K] }
  & { [K in Exclude<keyof T2, KeyExcludeOptinal>]: T2[K] }

/**
 * @example `type R = AllValues<Record<'uid', 'tbUserUid'>>`
 * @see https://stackoverflow.com/a/56416192
 */
export type AllValues<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T]: { key: P, value: T[P] }
}[keyof T]

/**
 * @example `type R = KeyFromValue<{uid: 'tbUserUid'}, 'tbUserUid'>` got `uid`
 * @ref https://stackoverflow.com/a/57726844
 */
export type KeyFromValue<T, V> = {
  [key in KnownKeys<T>]: V extends T[key] ? key : never
}[KnownKeys<T>]

/**
 * Invert key/value of type/interface
 * @example `type R = Invert<{x: 'a', y: 'b'}>` got `{a: 'x', b: 'y'}`
 * @example `type R = Invert<{x: 'a', y: 'b', z: 'a'}>` got `{a: 'x' | 'z', b: 'y'}`
 * @see https://stackoverflow.com/a/57726844
 */
export type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in T[keyof T]]: KeyFromValue<T, K>
}


/**
 * @see https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
 */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false
/**
 * (Experimental) Equals two types which convert by FormatIntersect<>
 * ```
 */
export type EqualsExt<X, Y> = Equals<FormatIntersect<X>, FormatIntersect<Y>>

export type OverwriteNeverToUnknown<T extends any> = {
  [fld in keyof T]: T[fld] extends never ? unknown : T[fld]
}

/* eslint-disable @typescript-eslint/ban-types */
/**
 * (Experimental) Rewrite members of intersect type into one type deeply
 *
 * @example ```ts
 * {foo: number} & {bar: string} => {foo: number, bar: string}
 * ```
 */
export type FormatIntersect<T, deep extends boolean = true> = T extends Record<string | number, any>
  ? T extends any[] | Function | Date
    ? T
    : { [K in keyof T]: deep extends true ? FormatIntersect<T[K], true> : T[K] }
  : T

/**
 * Retrive keys
 * @see https://stackoverflow.com/a/51955852/2887218
 */
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never

/**
 * Retrive types
 * @see https://stackoverflow.com/a/51955852/2887218
 */
export type ValuesOf<T> = T extends { [_ in keyof T]: infer U } ? U : never

