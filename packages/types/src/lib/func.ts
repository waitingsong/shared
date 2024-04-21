/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
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
export type MethodType<ArgsType extends unknown[] = any[], ReturnType = any | Promise<any>> = (...input: ArgsType) => ReturnType
/**
 * ReturnType is unknown
 */
export type MethodTypeUnknown<ArgsType extends any[] = any[], ReturnType extends unknown = unknown> = (...input: ArgsType) => ReturnType

/**
 * ReturnType is Promise<unknown>
 */
export type AsyncMethodType<ArgsType extends any[] = any[], ResultType extends unknown = unknown> = (...input: ArgsType) => Promise<ResultType>

