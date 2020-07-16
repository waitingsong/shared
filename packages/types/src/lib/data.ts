/* eslint-disable @typescript-eslint/no-explicit-any */

/** Value of key-value pairs object */
export type PlainJsonValue = boolean | number | string | null

/**
 * Typeof JSON object parsed from Response data
 * simple key-value pairs object.
 */
export type JsonType =
  | string
  | number
  | boolean
  | null
  | JsonType[]
  | { [property: string]: JsonType }

/** Custom response json data structure */
export interface JsonResp<
  T extends JsonType = any
> {
  /** 0: no error */
  code: number
  /** payload */
  dat?: T
  msg?: string | null
}

