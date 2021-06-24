
/**
 *
 * @link https://stackoverflow.com/a/61324746
 */
export function bigIntMin(...args: bigint[]): bigint {
  return args.reduce((acc, curr) => curr < acc ? curr : acc)
}

/**
 *
 * @link https://stackoverflow.com/a/61324746
 */
export function bigIntMax(...args: bigint[]): bigint {
  return args.reduce((acc, curr) => curr > acc ? curr : acc)
}

