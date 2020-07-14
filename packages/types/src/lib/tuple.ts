/* eslint-disable @typescript-eslint/no-explicit-any */

// ref: https://zhuanlan.zhihu.com/p/38687656

/** Get the first element */
export type TupleHead<T extends any[]> = T[0]

/** Remove the first element */
export type TupleTail<T extends any[]> = ((...t: T) => void) extends (x: any, ...t: infer R) => void ? R : never

/** Get the last element */
export type TupleLast<T extends any[]> = T[TupleTail<T>['length']]

/** Remove the last element */
export type TupleRemoveLast<T extends any[]> = TypeAssert<Overwrite<TupleTail<T>, T>, any[]>

/** Insert element at first */
export type TupleUnshift<T extends any[], X> = ((x: X, ...t: T) => void) extends (...t: infer R) => void ? R : never

/** Append element at last */
export type TuplePush<T extends any[], X> = TypeAssert<Overwrite<TupleUnshift<T, any>, T & { [x: string]: X }>, any[]>

/** Concat two tuples */
export type TupleConcat<A extends any[], B extends any[]> = {
  1: A,
  0: TupleConcat<TuplePush<A, B[0]>, TupleTail<B>>,
}[B extends [] ? 1 : 0]

// 用到的 helper 类型，简化代码和解决某些情况下的类型错误
export type TypeAssert<T, A> = T extends A ? T : never
// @ts-expect-error
export type Overwrite<T, S extends any> = { [P in keyof T]: S[P] }
