/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Func {
  (...args: any[]): any | Promise<any>
  (this: any, ...args: any[]): any | Promise<any>
}

/**
 * ReturnType is any
 */
export type MethodType = (...input: any[]) => (any | Promise<any>)

/**
 * ReturnType is unknown
 */
export type MethodTypeUnknown<
  ArgsType extends any[] = any[],
  ReturnType extends unknown = unknown,
> = (...input: ArgsType) => ReturnType

/**
 * ReturnType is Promise<unknown>
 */
export type AsyncMethodType<
  ArgsType extends any[] = any[],
  ResultType extends unknown = unknown,
> = (...input: ArgsType) => Promise<ResultType>

