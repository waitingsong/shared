/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Func {
  /**
   * Returns the name of the function. Function names are read-only and can not be changed.
   */
  readonly name: string
  (...args: any[]): any | Promise<any>
  (this: any, ...args: any[]): any | Promise<any>
}

/**
 * ReturnType is any
 */
export type MethodType<
  ArgsType extends unknown[] = any[],
  ReturnType = any | Promise<any>,
  TThis = any,
> = (this: TThis, ...input: ArgsType) => ReturnType
/**
 * ReturnType is unknown
 */
export type MethodTypeUnknown<
  ArgsType extends any[] = any[],
  ReturnType = unknown,
  TThis = any,
> = (this: TThis, ...input: ArgsType) => ReturnType

/**
 * ReturnType is Promise<unknown>
 */
export type AsyncMethodType<
  ArgsType extends any[] = any[],
  ResultType = unknown,
  TThis = any,
> = (this: TThis, ...input: ArgsType) => Promise<ResultType>


/**
 * Convert a function type to an async function type
 */
export type ToAsyncFunction<T extends (...args: any) => any> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : never

