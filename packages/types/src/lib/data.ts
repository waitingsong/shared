/* eslint-disable @typescript-eslint/no-explicit-any */

/** Value of key-value pairs object */
export type PlainJsonValue = boolean | number | string | null

/**
 * Typeof JSON object parsed from Response data
 * simple key-value pairs object.
 */
export interface JsonObject {
  [key: string]: PlainJsonValue | PlainJsonValue[] | JsonObject | JsonObject[]
}
export type JsonType =
  | PlainJsonValue
  | JsonType[]
  | { [property: string]: JsonType }

export interface LiteralObject {
  [property: string]: string | LiteralObject
}

// https://stackoverflow.com/a/57318205
/** Custom response json data structure */
export type JsonResp<T = never> = {
  /** 0: success */
  code: number,
  /**
   * keyof typeof ErrorCode, eg. 'E_Not_Found'
   */
  codeKey?: string,
  msg?: string | null,
  /** Request id */
  reqId?: string,
} & ([T] extends [never]
  /** payload */
  ? { data?: unknown }
  : { data: T }
)

/**
 * Pick type T from Promise<T>
 * @deprecated use native since TypeScript 4.5
 * @link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements
 * @link https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types
 */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

