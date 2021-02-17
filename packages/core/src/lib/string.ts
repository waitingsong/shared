/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */


/**
 *
 * @see SnakeToCamel of @waiting/shared-types
 */
export function snakeToCamel(input: string): string {
  const line = input.replace(/-/gu, '_')
  const ret = line.replace(/_./gu, (match) => {
    const str = match.toUpperCase()
    return str.slice(1)
  })
  return ret
}


/**
 *
 * @see SnakeToPascal of @waiting/shared-types
 */
export function snakeToPascal(input: string): string {
  const line = snakeToCamel(input)
  const p1 = line.slice(0, 1).toUpperCase()
  const p2 = line.slice(1)
  return `${p1}${p2}`
}

