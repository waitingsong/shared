/* eslint-disable @typescript-eslint/no-explicit-any */

/** Value of key-value pairs object */
export type PlainJsonValue = boolean | number | string | null
/**
 * Typeof JSON object parsed from Response data
 * simple key-value pairs object.
 */
export interface JsonType {
  [key: string]: PlainJsonValue | PlainJsonValue[] | JsonType | JsonType[]
}

/** Custom response json data structure */
export interface JsonResp<
  T extends JsonType | PlainJsonValue | PlainJsonValue[] | JsonType[] | any = any
> {
  /** 0: no error */
  code: number
  /** payload */
  dat?: T
  msg?: string | null
}

