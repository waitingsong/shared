import type { IncomingHttpHeaders } from 'node:http'

import type { Headers as UndiciHeaders } from 'undici'


export function retrieveHeadersItem(
  headers: IncomingHttpHeaders | HeadersInit | UndiciHeaders | undefined,
  name: string,
): string | undefined {

  if (! headers) {
    return
  }

  if (typeof (headers as Headers).get === 'function') {
    const val = (headers as Headers).get(name)
    if (['string', 'undefined'].includes(typeof val)) {
      return val as string | undefined
    }
    return
  }
  else if (Array.isArray(headers)) {
    console.warn('Not supported param type Array, only support Record or Headers Map')
    return
  }
  else if (typeof headers === 'object' && Object.keys(headers).length && Object.hasOwn(headers, name)) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const val = headers[name]
    if (['string', 'undefined'].includes(typeof val)) {
      return val as string | undefined
    }
    return
  }

  /* c8 ignore next */
  return
}

