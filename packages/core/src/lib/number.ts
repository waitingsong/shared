
export const defaultNumberFormatOptions: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
}

export const defaultNumberFormatOptionsPretty: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  notation: 'compact',
}

export const numberFormatterCN = new Intl.NumberFormat('zh-CN', defaultNumberFormatOptions)
export const numberFormatterPrettyEN = new Intl.NumberFormat('en-US', defaultNumberFormatOptionsPretty)

export function formatNumber(
  input: number | bigint,
  locales: string | string[] = 'zh-CN',
  options?: Intl.NumberFormatOptions,
): string {

  const numberFormatter = locales && options
    ? new Intl.NumberFormat(locales, options)
    : numberFormatterCN

  const ret = numberFormatter.format(input)
  return ret
}


export function formatNumberPretty(
  input: number | bigint,
  locales: string | string[] = 'en-US',
  options?: Intl.NumberFormatOptions,
): string {

  const numberFormatter = locales && options
    ? new Intl.NumberFormat(locales, options)
    : numberFormatterPrettyEN

  const ret = numberFormatter.format(input)
  return ret
}

// new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'CNY' }).format(123456.78967)

export const defaultNumberFormatOptionsCurrencyCNY: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'CNY',
}
export const numberFormatterCurrencyCNY = new Intl.NumberFormat('zh-CN', defaultNumberFormatOptionsCurrencyCNY)

export function formatNumberCurrencyCNY(
  input: number | bigint,
  locales: string | string[] = 'zh-CN',
  options?: Intl.NumberFormatOptions,
): string {

  const numberFormatter = locales && options
    ? new Intl.NumberFormat(locales, options)
    : numberFormatterCurrencyCNY

  const ret = numberFormatter.format(input)
  return ret
}
