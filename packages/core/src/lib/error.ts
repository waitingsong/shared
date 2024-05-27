import assert from 'node:assert'


export interface GenErrorOptions {
  error: unknown
  /**
   * Used as the error message if `error` is not an instance of `Error`
   */
  altMessage?: string
  /**
   * If input error is `undefined`, this message will be used as the error message
   */
  throwMessageIfInputUndefined?: string
}

/**
 * Generate an error object from the input, input error can be:
 * - Error
 * - string
 * - any other type, will be used as the cause of the error
 */
export function genError(options: GenErrorOptions): Error {
  const { error, altMessage, throwMessageIfInputUndefined } = options
  assert(typeof error !== 'undefined', throwMessageIfInputUndefined ?? 'input Error is undefined while call genError()')

  let err
  if (error instanceof Error) {
    err = error
  }
  else if (typeof error === 'string') {
    err = new Error(error)
  }
  else {
    err = new Error(altMessage ?? 'Error', { cause: error })
  }

  return err
}

