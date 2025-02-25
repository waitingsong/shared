
/**
 * @link https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 */
export interface FmtNumberOptions extends Intl.NumberFormatOptions {
  /**
   * The locale or locales to use
   *
   * See [MDN - Intl - locales argument](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
   * @example
   *  - zh-Hans-CN-u-nu-hanidec: 一二三,四五六.七八
   *  - zh-Hans-CN
   *  - en-US: 123,456.78
   *  - de-DE: 123.456,78
   */
  locales?: Intl.LocalesArgument
}

const defaultFmtNumberOptions: FmtNumberOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

export function fmtNumber(num: number | bigint, options?: FmtNumberOptions): string {
  const locales = options?.locales
  const opts: FmtNumberOptions = {
    ...defaultFmtNumberOptions,
    ...options,
  }
  delete opts.locales

  const ret = new Intl.NumberFormat(locales, opts).format(num)
  return ret
}

