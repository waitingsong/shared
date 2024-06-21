import assert from 'node:assert'

import { $, quote } from 'zx'


export function patchZxQuote(): void {
  const needle = 'foo'
  if (typeof $.quote !== 'function') {
    _patchZxQuote()
    return
  }

  try {
    const txt = $.quote(needle)
    if (txt === needle) {
      return
    }
    else {
      _patchZxQuote()
    }
  }
  catch (ex) {
    assert(ex instanceof Error)
    if (ex.message.includes('quote')) {
      _patchZxQuote()
    }
  }
}

export function _patchZxQuote(): void {
  $.quote = quote
}

