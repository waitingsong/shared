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

// https://stackoverflow.com/a/57318205
/** Custom response json data structure */
export type JsonResp<T = never> = {
  /** 0: no error */
  code: number,
  /**
   * keyof typeof ErrorCode, eg. 'E_Not_Found'
   */
  codeKey?: string,
  msg?: string | null,
  /** Request id */
  reqId?: string,
} & ([T] extends [never]
  ? {
    /** payload */
    dat?: unknown,
  }
  : {
    /** payload */
    dat: T,
  }
)

