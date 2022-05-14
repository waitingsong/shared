/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'

import { Observable } from 'rxjs'


/**
 * Read file line by line
 *
 * @see https://nodejs.org/dist/latest-v12.x/docs/api/readline.html#readline_example_read_file_stream_line_by_line
 */
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
}
