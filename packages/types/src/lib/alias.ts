/* eslint-disable @typescript-eslint/no-explicit-any */

export type BigIntStr = bigint | string

/**
 * ISO 8601 format,
 * new Date().toISOString()
 *
 * @example
 * - '2020-03-03T02:12:53.123Z'
 */
export type DateISOString = `${N4}-${N2}-${N2}T${N2}:${N2}:${N2}.${N3}Z`


type N4 = `${number}${number}${number}${number}`
type N3 = `${number}${number}${number}`
type N2 = `${number}${number}`

