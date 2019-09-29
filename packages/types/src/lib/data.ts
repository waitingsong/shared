
/** Value of key-value pairs object */
export type PlainJsonValue = boolean | number | string | null | undefined
/**
 * Typeof JSON object parsed from Response data
 * simple key-value pairs object.
 */
export interface JsonType {
  [key: string]: PlainJsonValue | PlainJsonValue[] | JsonType | JsonType[]
}

/** Custom response json data structure */
export interface JsonResp<
  T extends JsonType | PlainJsonValue | PlainJsonValue[] | JsonType[] = JsonType
> extends JsonType {
  /** 0: no error */
  err: number
  /** payload */
  dat?: T
  msg?: string | null
}

