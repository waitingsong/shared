
import assert from 'node:assert'
import { isAbsolute, resolve } from 'node:path'

import { isWin32 } from './consts.js'


// import { createReadStream } from 'node:fs'
// import { createInterface } from 'node:readline'
/**
 * Read file line by line
 *
 * @see https://nodejs.org/dist/latest-v12.x/docs/api/readline.html#readline_example_read_file_stream_line_by_line
 */
/*
export function readFileLineRx(path: string): Observable<string> {
  const fileStream = createReadStream(path)
  const rline = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  // const line$ = Observable.create((obv: Observer<string>) => {
  //   rline.on('line', line => obv.next(line))
  //   rline.once('close', () => obv.complete())

  //   return () => rline.removeAllListeners()
  // }) as Observable<string>

  const line$ = new Observable<string>((subscriber) => {
    rline.on('line', line => subscriber.next(line))
    rline.once('close', () => subscriber.complete())
    rline.once('error', err => subscriber.error(err))

    return () => rline.removeAllListeners()
  })

  return line$
} */


export function genAbsolutePath(path: string, fileUrlPrefix = false): string {
  assert(path, 'path is empty')

  if (path.startsWith('file://') && fileUrlPrefix) {
    return path
  }

  const path2 = _genAbsolutePath(path)
  const ret = fileUrlPrefix
    ? path2.startsWith('file://') ? path2 : `file://${path2}`
    : path2
  return ret
}
function _genAbsolutePath(path: string): string {
  assert(path, 'path is empty')

  if (isAbsolute(path)) {
    return path
  }

  if (path.startsWith('.')) {
    return resolve(process.cwd(), path)
  }

  if (path.toLocaleLowerCase().startsWith('file://')) {
    const p1 = path.slice(7)
    if (isWin32 && p1.startsWith('/')) {
      return p1.slice(1)
    }
    return p1
  }

  console.error('path:', { path })
  assert(false, 'path is invalid')
}

