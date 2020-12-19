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

/** Custom response json data structure */
export interface JsonResp<T = unknown> {
  /** 0: no error */
  code: number
  /** payload */
  dat?: T
  msg?: string | null
  /** Request id */
  reqId?: string
}

