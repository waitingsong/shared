
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// ref: https://zhuanlan.zhihu.com/p/38687656
// original ref: https://github.com/microsoft/typescript/pull/24897
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
  T extends any[]= ToTuple<R>
> = Reverse<Unshift<T, Element>>
