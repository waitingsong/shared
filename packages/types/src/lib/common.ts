/* eslint-disable @typescript-eslint/no-explicit-any */

// ref: https://zhuanlan.zhihu.com/p/38687656
// original ref: https://github.com/microsoft/typescript/pull/24897
// dependencies typescript >= 3.1
export type Head<Tuple extends any[]> = Tuple extends [infer H, ...any[]] ? H : never
export type Tail<Tuple extends any[]> = ((...x: Tuple) => void) extends ((h: any, ...rest: infer R) => void) ? R : never
export type Unshift<
  Tuple extends any[],
  Element> = ((h: Element, ...tuple: Tuple) => void) extends (...x: infer R) => void ? R : never
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
export type Push<
  Tuple extends any[],
  Element,
  R = Reverse<Tuple>,
  T extends any[] = ToTuple<R>
> = Reverse<Unshift<T, Element>>

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

