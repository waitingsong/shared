import type { IncomingHttpHeaders } from 'http'


export function retrieveHeadersItem(
  headers: IncomingHttpHeaders | HeadersInit | undefined,
  name: string,
): string | null | undefined {

  if (! headers) {
    return ''
  }

  if (typeof (headers as Headers).get === 'function') {
    return (headers as Headers).get(name)
  }
  else if (Array.isArray(headers)) {
    console.warn('Not supported param type Array, only support Record or Headers Map')
  }
  else if (typeof headers === 'object' && Object.keys(headers).length) {
    // @ts-ignore
    return headers[name] as string | undefined
  }

  return ''
}

